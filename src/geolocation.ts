import L from "leaflet";

// Numeric tolerance for detecting singular matrices / collinear points
const EPSILON = 1e-10;

// 誤差の閾値 (m) — この値を超えた場合は警告を出す
const ERROR_THRESHOLD_METERS = 30;

// Reference points for location information
interface ReferencePoint {
  lat: number;
  lng: number;
  x: number;
  y: number;
}

const refPoints: ReferencePoint[] = [
  { lat: 35.659289, lng: 139.6861967, x: 2527, y: 852 }, // point1 - top-right of intersection at bottom-left of Itatoma
  { lat: 35.6630751, lng: 139.6835443, x: 913, y: 2545 }, // point2 - Baseball field gate
  { lat: 35.6595954, lng: 139.6833344, x: 1292, y: 620 }, // point3 - bottom-left corner of 900 Lecture Hall
  // TODO: Add more reference points for better accuracy.
  // Measure coordinates from Google Maps and find corresponding pixel positions on the map image.
  // Example format:
  // { lat: 35.XXXXX, lng: 139.XXXXX, x: XXXX, y: XXXX }, // description
];

// Solve linear system Ax = b using Gaussian elimination
function solveLinearSystem(A: number[][], b: number[]): number[] | null {
  const n = A.length;
  if (n === 0 || b.length !== n) return null;

  const augmented = A.map((row, i) => {
    const bValue = b[i];
    if (bValue === undefined) return null;
    return [...row, bValue];
  });

  if (augmented.some((row) => row === null)) return null;

  // Forward elimination
  for (let col = 0; col < n; col++) {
    const augCol = augmented[col];
    if (!augCol) return null;

    // Find pivot
    let maxRow = col;
    const augMaxRowInit = augmented[maxRow];
    if (!augMaxRowInit) return null;
    let maxVal = Math.abs(augMaxRowInit[col] ?? 0);

    for (let row = col + 1; row < n; row++) {
      const augRow = augmented[row];
      if (!augRow) continue;
      const val = Math.abs(augRow[col] ?? 0);
      if (val > maxVal) {
        maxRow = row;
        maxVal = val;
      }
    }

    const augMaxRow = augmented[maxRow];
    if (!augMaxRow) return null;

    [augmented[col], augmented[maxRow]] = [augMaxRow, augCol];

    const pivotRow = augmented[col];
    if (!pivotRow) return null;
    const pivotVal = pivotRow[col];
    if (pivotVal === undefined || Math.abs(pivotVal) < EPSILON) continue;

    for (let row = col + 1; row < n; row++) {
      const currentRow = augmented[row];
      if (!currentRow) continue;
      const currentVal = currentRow[col];
      if (currentVal === undefined) continue;

      const factor = currentVal / pivotVal;
      for (let j = col; j <= n; j++) {
        const pivotElem = pivotRow[j];
        const currentElem = currentRow[j];
        if (pivotElem !== undefined && currentElem !== undefined) {
          currentRow[j] = currentElem - factor * pivotElem;
        }
      }
    }
  }

  // Back substitution
  const x = new Array(n).fill(0);
  for (let i = n - 1; i >= 0; i--) {
    const augRow = augmented[i];
    if (!augRow) return null;
    const augRowN = augRow[n];
    if (augRowN === undefined) return null;

    x[i] = augRowN;
    for (let j = i + 1; j < n; j++) {
      const augRowJ = augRow[j];
      const xJ = x[j];
      if (augRowJ !== undefined && xJ !== undefined) {
        x[i]! -= augRowJ * xJ;
      }
    }

    const diagElem = augRow[i];
    if (diagElem !== undefined && Math.abs(diagElem) > EPSILON) {
      x[i]! /= diagElem;
    }
  }

  return x;
}

// Solve normal equations: (A^T A) x = A^T b
function solveNormalEquations(A: number[][], b: number[]): number[] | null {
  const rows = A.length;
  if (rows === 0) return null;
  const firstRow = A[0];
  if (!firstRow) return null;
  const cols = firstRow.length;

  // Compute A^T A
  const AtA: number[][] = Array.from({ length: cols }, () =>
    new Array(cols).fill(0),
  );
  for (let i = 0; i < cols; i++) {
    const AtARow = AtA[i];
    if (!AtARow) continue;
    for (let j = 0; j < cols; j++) {
      let sum = 0;
      for (let k = 0; k < rows; k++) {
        const ARow = A[k];
        if (!ARow) continue;
        const ARowI = ARow[i];
        const ARowJ = ARow[j];
        if (ARowI !== undefined && ARowJ !== undefined) {
          sum += ARowI * ARowJ;
        }
      }
      AtARow[j] = sum;
    }
  }

  // Compute A^T b
  const Atb: number[] = new Array(cols).fill(0);
  for (let i = 0; i < cols; i++) {
    let sum = 0;
    for (let k = 0; k < rows; k++) {
      const ARow = A[k];
      const bVal = b[k];
      if (!ARow || bVal === undefined) continue;
      const ARowI = ARow[i];
      if (ARowI !== undefined) {
        sum += ARowI * bVal;
      }
    }
    Atb[i] = sum;
  }

  return solveLinearSystem(AtA, Atb);
}

// Polynomial transformation using least squares (2nd order)
// Supports 4+ reference points for better accuracy
function createPolynomialTransformer(
  points: ReferencePoint[],
): ((lat: number, lng: number) => L.LatLngExpression | null) | null {
  if (points.length < 4) {
    console.warn(
      "Less than 4 reference points. Falling back to affine transformation.",
    );
    return createAffineTransformer(points);
  }

  const n = points.length;
  // 2nd order polynomial: x = a0 + a1*lat + a2*lng + a3*lat^2 + a4*lat*lng + a5*lng^2
  // Same for y
  const numCoeffs = 6;

  if (n < numCoeffs) {
    console.warn(
      `Not enough points for 2nd order polynomial (${n} < ${numCoeffs}). Using affine.`,
    );
    return createAffineTransformer(points);
  }

  // Build matrix for x coefficients
  const Ax: number[][] = [];
  const bx: number[] = [];
  const Ay: number[][] = [];
  const by: number[] = [];

  for (const p of points) {
    const row = [1, p.lat, p.lng, p.lat * p.lat, p.lat * p.lng, p.lng * p.lng];
    Ax.push(row);
    bx.push(p.x);
    Ay.push([...row]);
    by.push(p.y);
  }

  const xCoeffs = solveNormalEquations(Ax, bx);
  const yCoeffs = solveNormalEquations(Ay, by);

  if (!xCoeffs || !yCoeffs) {
    console.error("Failed to solve normal equations");
    return null;
  }

  if (xCoeffs.length < 6 || yCoeffs.length < 6) {
    console.error("Invalid coefficient array length");
    return null;
  }

  return (lat: number, lng: number): L.LatLngExpression | null => {
    const xCoeff0 = xCoeffs[0];
    const xCoeff1 = xCoeffs[1];
    const xCoeff2 = xCoeffs[2];
    const xCoeff3 = xCoeffs[3];
    const xCoeff4 = xCoeffs[4];
    const xCoeff5 = xCoeffs[5];

    const yCoeff0 = yCoeffs[0];
    const yCoeff1 = yCoeffs[1];
    const yCoeff2 = yCoeffs[2];
    const yCoeff3 = yCoeffs[3];
    const yCoeff4 = yCoeffs[4];
    const yCoeff5 = yCoeffs[5];

    if (
      xCoeff0 === undefined ||
      xCoeff1 === undefined ||
      xCoeff2 === undefined ||
      xCoeff3 === undefined ||
      xCoeff4 === undefined ||
      xCoeff5 === undefined ||
      yCoeff0 === undefined ||
      yCoeff1 === undefined ||
      yCoeff2 === undefined ||
      yCoeff3 === undefined ||
      yCoeff4 === undefined ||
      yCoeff5 === undefined
    ) {
      return null;
    }

    const x =
      xCoeff0 +
      xCoeff1 * lat +
      xCoeff2 * lng +
      xCoeff3 * lat * lat +
      xCoeff4 * lat * lng +
      xCoeff5 * lng * lng;
    const y =
      yCoeff0 +
      yCoeff1 * lat +
      yCoeff2 * lng +
      yCoeff3 * lat * lat +
      yCoeff4 * lat * lng +
      yCoeff5 * lng * lng;
    return [y, x];
  };
}

// Function to calculate affine transformation coefficients from 3 points
function createAffineTransformer(
  points: ReferencePoint[],
): ((lat: number, lng: number) => L.LatLngExpression | null) | null {
  if (points.length < 3) {
    console.error("At least 3 reference points are required");
    return null;
  }
  const p1 = points[0];
  const p2 = points[1];
  const p3 = points[2];

  if (!p1 || !p2 || !p3) {
    console.error("Invalid reference points");
    return null;
  }

  // Determinant
  const det =
    p1.lat * (p2.lng - p3.lng) +
    p2.lat * (p3.lng - p1.lng) +
    p3.lat * (p1.lng - p2.lng);

  if (Math.abs(det) < EPSILON) {
    console.error("The 3 points are collinear. Cannot calculate correction.");
    return null;
  }

  const A =
    (p1.x * (p2.lng - p3.lng) +
      p2.x * (p3.lng - p1.lng) +
      p3.x * (p1.lng - p2.lng)) /
    det;
  const B =
    (p1.x * (p3.lat - p2.lat) +
      p2.x * (p1.lat - p3.lat) +
      p3.x * (p2.lat - p1.lat)) /
    det;
  const C =
    (p1.x * (p2.lat * p3.lng - p3.lat * p2.lng) +
      p2.x * (p3.lat * p1.lng - p1.lat * p3.lng) +
      p3.x * (p1.lat * p2.lng - p2.lat * p1.lng)) /
    det;

  const D =
    (p1.y * (p2.lng - p3.lng) +
      p2.y * (p3.lng - p1.lng) +
      p3.y * (p1.lng - p2.lng)) /
    det;
  const E =
    (p1.y * (p3.lat - p2.lat) +
      p2.y * (p1.lat - p3.lat) +
      p3.y * (p2.lat - p1.lat)) /
    det;
  const F =
    (p1.y * (p2.lat * p3.lng - p3.lat * p2.lng) +
      p2.y * (p3.lat * p1.lng - p1.lat * p3.lng) +
      p3.y * (p1.lat * p2.lng - p2.lat * p1.lng)) /
    det;

  return (lat: number, lng: number): L.LatLngExpression => {
    const x = A * lat + B * lng + C;
    const y = D * lat + E * lng + F;
    return [y, x];
  };
}

// Create transformation function (automatically chooses polynomial if 4+ points)
const convertLatLngToImageXY = createPolynomialTransformer(refPoints);

export function setupGeolocation(
  map: L.Map,
  imgWidth: number,
  imgHeight: number,
) {
  let userMarker: L.Marker | null = null;

  // Get location information
  navigator.geolocation.getCurrentPosition(
    (position: GeolocationPosition) => {
      const userLat: number = position.coords.latitude;
      const userLng: number = position.coords.longitude;
      const accuracy = position.coords.accuracy;

      // Convert latitude/longitude to image coordinates
      if (!convertLatLngToImageXY) {
        console.error("Coordinate transformer is not available");
        alert("座標変換システムの初期化に失敗しました。");
        return;
      }

      const imageXY = convertLatLngToImageXY(userLat, userLng);

      if (!imageXY || !Array.isArray(imageXY) || imageXY.length < 2) {
        console.error("Failed to convert coordinates");
        alert("座標変換に失敗しました。");
        return;
      }

      const imgY = imageXY[0];
      const imgX = imageXY[1];

      if (typeof imgY !== "number" || typeof imgX !== "number") {
        console.error("Invalid coordinate values");
        return;
      }

      // Check if coordinates are outside the map bounds
      if (imgX < 0 || imgX > imgWidth || imgY < 0 || imgY > imgHeight) {
        console.warn("User location is outside the map bounds", {
          lat: userLat,
          lng: userLng,
          imageXY: { x: imgX, y: imgY },
        });
        alert("現在地がマップの範囲外です。");
        return;
      }

      // Remove existing marker to prevent duplicates
      if (userMarker) {
        map.removeLayer(userMarker);
      }

      // Place marker
      userMarker = L.marker(imageXY)
        .addTo(map)
        .bindPopup("Current Location")
        .openPopup();

      // Show error warning only when inside map bounds and error is large
      if (accuracy > ERROR_THRESHOLD_METERS) {
        alert(
          `現在地は正確ではない可能性があります（誤差：約${Math.round(accuracy)}m）`,
        );
      }

      // Log the obtained values
      console.log(
        "gps:",
        { lat: userLat, lng: userLng, error_m: accuracy },
        "imageXY:",
        { y: Number(imgY.toFixed(2)), x: Number(imgX.toFixed(2)) },
      );
    },
    (error: GeolocationPositionError) => {
      console.error("Failed to get location information", error);
      // ユーザーが位置情報の共有を拒否した場合（PERMISSION_DENIED）はアラートを表示しない
      if (error.code !== error.PERMISSION_DENIED) {
        alert("位置情報の取得に失敗しました。");
      }
    },
    {
      enableHighAccuracy: true,
      maximumAge: 5_000,
      timeout: 10_000,
    },
  );
}

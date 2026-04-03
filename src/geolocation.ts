import L from "leaflet";

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
];

// Function to calculate affine transformation coefficients from 3 points
function createAffineTransformer(points: ReferencePoint[]) {
  if (points.length < 3) {
    console.error("At least 3 reference points are required");
    return (lat: number, lng: number) => [0, 0] as L.LatLngExpression;
  }
  const p1 = points[0]!;
  const p2 = points[1]!;
  const p3 = points[2]!;

  // Determinant
  const det =
    p1.lat * (p2.lng - p3.lng) +
    p2.lat * (p3.lng - p1.lng) +
    p3.lat * (p1.lng - p2.lng);

  if (Math.abs(det) < 1e-10) {
    console.error("The 3 points are collinear. Cannot calculate correction.");
    return (lat: number, lng: number) => [0, 0] as L.LatLngExpression;
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

// Create transformation function
const convertLatLngToImageXY = createAffineTransformer(refPoints);

export function setupGeolocation(map: L.Map) {
  // Get location information
  navigator.geolocation.getCurrentPosition(
    (position: GeolocationPosition) => {
      const userLat: number = position.coords.latitude;
      const userLng: number = position.coords.longitude;

      // Convert latitude/longitude to image coordinates (return value is already in decimal)
      const imageXY = convertLatLngToImageXY(userLat, userLng);

      // Place marker
      L.marker(imageXY).addTo(map).bindPopup("Current Location").openPopup();

      // Verify the obtained values (display with 2 decimal places if needed)
      if (Array.isArray(imageXY)) {
        const [imgY, imgX] = imageXY;
        console.log(
          "gps:",
          { lat: userLat, lng: userLng, accuracy_m: position.coords.accuracy },
          "imageXY:",
          { y: Number(imgY.toFixed(2)), x: Number(imgX.toFixed(2)) },
        );
      }
    },
    (error: GeolocationPositionError) => {
      console.error("Failed to get location information", error);
    },
    {
      enableHighAccuracy: true,
      maximumAge: 5_000,
      timeout: 10_000,
    },
  );
}

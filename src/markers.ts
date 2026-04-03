import L from "leaflet";
import * as im from "./assets";

interface MarkerState {
  markers: L.Marker[];
  visible: boolean;
}

export function setupWaterServerMarkers(map: L.Map): MarkerState {
  const hiddenWSMarkers: L.Marker[] = [
    L.marker([1560, 1560]).bindPopup("Komaba Library 1F"),
    L.marker([1351, 2680]).bindPopup("Comipla 1F"),
    L.marker([1351, 2650]).bindPopup("Comipla 2F"),
    L.marker([1494, 2823]).bindPopup("Campus Plaza A Building 1F"),
    L.marker([1529, 2688]).bindPopup("2nd Gymnasium 1F"),
    L.marker([1567, 2689]).bindPopup("2nd Gymnasium 2F"),
    L.marker([1668, 2991]).bindPopup("1st Gymnasium 2F"),
    L.marker([1390, 2065]).bindPopup("Building 8 1F"),
    L.marker([1645, 2200]).bindPopup("21 KOMCEE West B1F"),
    L.marker([1026, 2812]).bindPopup("Building 5 1F"),
    L.marker([1160, 1318]).bindPopup("Building 13 1F"),
    L.marker([1500, 860]).bindPopup("Building 15 1F"),
    L.marker([1340, 2788]).bindPopup("Co-op Purchasing Department"),
    L.marker([505, 2826]).bindPopup(
      "Mathematical Science Research Building 1F",
    ),
  ];

  return { markers: hiddenWSMarkers, visible: false };
}

export function setupVendingMachineMarkers(map: L.Map): MarkerState {
  const orangeIcon = L.icon({
    iconUrl:
      "https://raw.githubusercontent.com/pointhi/leaflet-color-markers/master/img/marker-icon-2x-orange.png",
    iconSize: [25, 41],
    iconAnchor: [12.5, 41],
  });

  const hiddenVMMarkers: L.Marker[] = [
    L.marker([1097, 1504], { icon: orangeIcon }),
    L.marker([1096, 1625], { icon: orangeIcon }),
    L.marker([1762, 2443], { icon: orangeIcon }),
    L.marker([1686, 2536], { icon: orangeIcon }),
  ];

  return { markers: hiddenVMMarkers, visible: false };
}

export function toggleMarkers(
  map: L.Map,
  markers: L.Marker[],
  visible: boolean,
): boolean {
  if (visible) {
    markers.forEach((m) => map.removeLayer(m));
  } else {
    markers.forEach((m) => m.addTo(map));
  }
  return !visible;
}

const buttonStyle = `
  display: inline-block;
  margin-top: 8px;
  padding: 8px 16px;
  background-color: #3b82f6;
  color: white;
  border: none;
  border-radius: 6px;
  font-size: 14px;
  font-weight: 600;
  cursor: pointer;
  text-decoration: none;
  transition: background-color 0.2s;
`;

const buttonHoverStyle = `
  background-color: #2563eb;
`;

export function setupBuildingPolygons(map: L.Map) {
  const createBuildingPopup = (buildingId: string, name: string) => {
    return `
    <div style="text-align: center; padding: 8px;">
      <p style="margin: 0 0 8px 0; font-weight: bold; font-size: 16px;">${name}</p>
      <a href="/building/${buildingId}" style="${buttonStyle}" onmouseover="this.style.backgroundColor='#2563eb'" onmouseout="this.style.backgroundColor='#3b82f6'">
        階層図を表示
      </a>
    </div>
    `;
  };

  const library = L.polygon(
    [
      [1024, 2687],
      [1019, 2904],
      [858, 2904],
      [854, 2692],
    ],
    {
      color: "transparent",
      fillOpacity: 0,
    },
  )
    .addTo(map)
    .bindPopup(createBuildingPopup("library", "図書館"));

  L.polygon(
    [
      [1193, 1727],
      [935, 1727],
      [935, 2082],
      [1193, 2082],
    ],
    { color: "transparent", fillOpacity: 0 },
  )
    .addTo(map)
    .bindPopup(createBuildingPopup("building1", "1号館"));

  L.polygon(
    [
      [1181, 2177],
      [1181, 2423],
      [1115, 2423],
      [1115, 2177],
    ],
    { color: "transparent", fillOpacity: 0 },
  )
    .addTo(map)
    .bindPopup(createBuildingPopup("building101", "101号館"));

  L.polygon(
    [
      [964, 1017],
      [879, 1017],
      [879, 1173],
      [964, 1173],
    ],
    { color: "transparent", fillOpacity: 0 },
  )
    .addTo(map)
    .bindPopup(createBuildingPopup("building2", "2号館"));

  L.polygon(
    [
      [1612, 1352],
      [1506, 1353],
      [1505, 1625],
      [1613, 1624],
    ],
    { color: "transparent", fillOpacity: 0 },
  )
    .addTo(map)
    .bindPopup(createBuildingPopup("building5", "5号館"));

  L.polygon(
    [
      [1461, 1557],
      [1342, 1558],
      [1341, 1733],
      [1461, 1732],
    ],
    { color: "transparent", fillOpacity: 0 },
  )
    .addTo(map)
    .bindPopup(createBuildingPopup("building7", "7号館"));

  L.polygon(
    [
      [1438, 1941],
      [1438, 2205],
      [1349, 2205],
      [1349, 1941],
    ],
    { color: "transparent", fillOpacity: 0 },
  )
    .addTo(map)
    .bindPopup(createBuildingPopup("building8", "8号館"));

  L.polygon(
    [
      [1618, 1839],
      [1618, 2109],
      [1521, 2109],
      [1521, 1839],
    ],
    { color: "transparent", fillOpacity: 0 },
  )
    .addTo(map)
    .bindPopup(createBuildingPopup("building9", "9号館"));

  L.polygon(
    [
      [1473, 1753],
      [1473, 1895],
      [1328, 1895],
      [1328, 1753],
    ],
    { color: "transparent", fillOpacity: 0 },
  )
    .addTo(map)
    .bindPopup(createBuildingPopup("building10", "10号館"));

  L.polygon(
    [
      [1194, 1510],
      [1194, 1624],
      [1015, 1624],
      [1015, 1510],
    ],
    { color: "transparent", fillOpacity: 0 },
  )
    .addTo(map)
    .bindPopup(createBuildingPopup("building11", "11号館"));

  L.polygon(
    [
      [1086, 1210],
      [1086, 1325],
      [948, 1325],
      [948, 1210],
    ],
    { color: "transparent", fillOpacity: 0 },
  )
    .addTo(map)
    .bindPopup(createBuildingPopup("building12", "12号館"));

  L.polygon(
    [
      [1217, 1209],
      [1217, 1420],
      [1121, 1420],
      [1121, 1209],
    ],
    { color: "transparent", fillOpacity: 0 },
  )
    .addTo(map)
    .bindPopup(createBuildingPopup("building13", "13号館"));

  L.polygon(
    [
      [1222, 992],
      [1215, 1155],
      [1126, 1155],
      [1126, 1057],
      [1018, 1057],
      [1018, 989],
    ],
    { color: "transparent", fillOpacity: 0 },
  )
    .addTo(map)
    .bindPopup(createBuildingPopup("building14", "14号館"));

  L.polygon(
    [
      [1474, 719],
      [1474, 913],
      [1344, 913],
      [1344, 719],
    ],
    { color: "transparent", fillOpacity: 0 },
  )
    .addTo(map)
    .bindPopup(createBuildingPopup("building15", "15号館"));

  L.polygon(
    [
      [1475, 913],
      [1540, 913],
      [1540, 1069],
      [1675, 1069],
      [1675, 749],
      [1540, 749],
      [1540, 801],
      [1475, 801],
    ],
    { color: "transparent", fillOpacity: 0 },
  )
    .addTo(map)
    .bindPopup(createBuildingPopup("building16", "16号館"));

  L.polygon(
    [
      [1589, 1136],
      [1487, 1136],
      [1486, 1308],
      [1588, 1308],
    ],
    { color: "transparent", fillOpacity: 0 },
  )
    .addTo(map)
    .bindPopup(createBuildingPopup("building17", "17号館"));

  L.polygon(
    [
      [1763, 1718],
      [1763, 1913],
      [1665, 1913],
      [1665, 1823],
      [1523, 1818],
      [1519, 1720],
    ],
    { color: "transparent", fillOpacity: 0 },
  )
    .addTo(map)
    .bindPopup(createBuildingPopup("building18", "18号館"));

  L.polygon(
    [
      [2125, 2578],
      [2125, 2679],
      [1954, 2679],
      [1954, 2578],
    ],
    { color: "transparent", fillOpacity: 0 },
  )
    .addTo(map)
    .bindPopup(createBuildingPopup("building19", "19号館"));

  L.polygon(
    [
      [1750, 2144],
      [1750, 2309],
      [1537, 2309],
      [1537, 2144],
    ],
    { color: "transparent", fillOpacity: 0 },
  )
    .addTo(map)
    .bindPopup(createBuildingPopup("komcee_west", "21KOMCEE West"));

  L.polygon(
    [
      [1715, 2342],
      [1715, 2443],
      [1352, 2443],
      [1352, 2243],
      [1451, 2243],
      [1451, 2342],
    ],
    { color: "transparent", fillOpacity: 0 },
  )
    .addTo(map)
    .bindPopup(createBuildingPopup("komcee_east", "21KOMCEE East"));

  L.polygon(
    [
      [860, 1373],
      [763, 1373],
      [763, 1493],
      [739, 1493],
      [739, 1558],
      [877, 1558],
      [877, 1494],
      [860, 1494],
    ],
    { color: "transparent", fillOpacity: 0 },
  )
    .addTo(map)
    .bindPopup(createBuildingPopup("building900", "900番講堂"));

  L.polygon(
    [
      [482, 1434],
      [381, 1434],
      [381, 1772],
      [482, 1772],
    ],
    { color: "transparent", fillOpacity: 0 },
  )
    .addTo(map)
    .bindPopup(createBuildingPopup("info_edu", "情報教育棟"));

  L.polygon(
    [
      [723, 2071],
      [723, 2304],
      [647, 2310],
      [647, 2418],
      [565, 2418],
      [565, 2071],
    ],
    { color: "transparent", fillOpacity: 0 },
  )
    .addTo(map)
    .bindPopup(
      createBuildingPopup("administration", "アドミニストレーション棟"),
    );

  L.polygon(
    [
      [1395, 2593],
      [1395, 2979],
      [1305, 2979],
      [1305, 2593],
    ],
    { color: "transparent", fillOpacity: 0 },
  )
    .addTo(map)
    .bindPopup(createBuildingPopup("comipla_north", "コミプラ北館"));
}

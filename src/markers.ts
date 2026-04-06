import L from "leaflet";

export interface MarkerData {
  position: [number, number];
  popup?: string;
}

export const waterServerMarkers: MarkerData[] = [
  { position: [1560, 1560], popup: "Komaba Library 1F" },
  { position: [1351, 2680], popup: "Comipla 1F" },
  { position: [1351, 2650], popup: "Comipla 2F" },
  { position: [1494, 2823], popup: "Campus Plaza A Building 1F" },
  { position: [1529, 2688], popup: "2nd Gymnasium 1F" },
  { position: [1567, 2689], popup: "2nd Gymnasium 2F" },
  { position: [1668, 2991], popup: "1st Gymnasium 2F" },
  { position: [1390, 2065], popup: "Building 8 1F" },
  { position: [1645, 2200], popup: "21 KOMCEE West B1F" },
  { position: [1026, 2812], popup: "Building 5 1F" },
  { position: [1160, 1318], popup: "Building 13 1F" },
  { position: [1500, 860], popup: "Building 15 1F" },
  { position: [1340, 2788], popup: "Co-op Purchasing Department" },
  {
    position: [505, 2826],
    popup: "Mathematical Science Research Building 1F",
  },
];

export const orangeIcon = L.icon({
  iconUrl:
    "https://raw.githubusercontent.com/pointhi/leaflet-color-markers/master/img/marker-icon-2x-orange.png",
  iconSize: [25, 41],
  iconAnchor: [12.5, 41],
});

export const vendingMachineMarkers: MarkerData[] = [
  { position: [1097, 1504] },
  { position: [1096, 1625] },
  { position: [1762, 2443] },
  { position: [1686, 2536] },
];

export interface PolygonData {
  id: string;
  name: string;
  positions: [number, number][];
  showDetailButton: boolean;
}

export const buildingPolygons: PolygonData[] = [
  {
    id: "library",
    name: "図書館",
    positions: [
      [1024, 2687],
      [1019, 2904],
      [858, 2904],
      [854, 2692],
    ],
    showDetailButton: true,
  },
  {
    id: "building1",
    name: "1号館",
    positions: [
      [1193, 1727],
      [935, 1727],
      [935, 2082],
      [1193, 2082],
    ],
    showDetailButton: true,
  },
  {
    id: "building101",
    name: "101号館",
    positions: [
      [1181, 2177],
      [1181, 2423],
      [1115, 2423],
      [1115, 2177],
    ],
    showDetailButton: false,
  },
  {
    id: "building2",
    name: "2号館",
    positions: [
      [964, 1017],
      [879, 1017],
      [879, 1173],
      [964, 1173],
    ],
    showDetailButton: false,
  },
  {
    id: "building5",
    name: "5号館",
    positions: [
      [1612, 1352],
      [1506, 1353],
      [1505, 1625],
      [1613, 1624],
    ],
    showDetailButton: true,
  },
  {
    id: "building7",
    name: "7号館",
    positions: [
      [1461, 1557],
      [1342, 1558],
      [1341, 1733],
      [1461, 1732],
    ],
    showDetailButton: true,
  },
  {
    id: "building8",
    name: "8号館",
    positions: [
      [1438, 1941],
      [1438, 2205],
      [1349, 2205],
      [1349, 1941],
    ],
    showDetailButton: true,
  },
  {
    id: "building9",
    name: "9号館",
    positions: [
      [1618, 1839],
      [1618, 2109],
      [1521, 2109],
      [1521, 1839],
    ],
    showDetailButton: false,
  },
  {
    id: "building10",
    name: "10号館",
    positions: [
      [1473, 1753],
      [1473, 1895],
      [1328, 1895],
      [1328, 1753],
    ],
    showDetailButton: true,
  },
  {
    id: "building11",
    name: "11号館",
    positions: [
      [1194, 1510],
      [1194, 1624],
      [1015, 1624],
      [1015, 1510],
    ],
    showDetailButton: true,
  },
  {
    id: "building12",
    name: "12号館",
    positions: [
      [1086, 1210],
      [1086, 1325],
      [948, 1325],
      [948, 1210],
    ],
    showDetailButton: true,
  },
  {
    id: "building13",
    name: "13号館",
    positions: [
      [1217, 1209],
      [1217, 1420],
      [1121, 1420],
      [1121, 1209],
    ],
    showDetailButton: true,
  },
  {
    id: "building14",
    name: "14号館",
    positions: [
      [1222, 992],
      [1215, 1155],
      [1126, 1155],
      [1126, 1057],
      [1018, 1057],
      [1018, 989],
    ],
    showDetailButton: false,
  },
  {
    id: "building15",
    name: "15号館",
    positions: [
      [1474, 719],
      [1474, 913],
      [1344, 913],
      [1344, 719],
    ],
    showDetailButton: true,
  },
  {
    id: "building16",
    name: "16号館",
    positions: [
      [1475, 913],
      [1540, 913],
      [1540, 1069],
      [1675, 1069],
      [1675, 749],
      [1540, 749],
      [1540, 801],
      [1475, 801],
    ],
    showDetailButton: true,
  },
  {
    id: "building17",
    name: "17号館",
    positions: [
      [1589, 1136],
      [1487, 1136],
      [1486, 1308],
      [1588, 1308],
    ],
    showDetailButton: true,
  },
  {
    id: "building18",
    name: "18号館",
    positions: [
      [1763, 1718],
      [1763, 1913],
      [1665, 1913],
      [1665, 1823],
      [1523, 1818],
      [1519, 1720],
    ],
    showDetailButton: true,
  },
  {
    id: "building19",
    name: "19号館",
    positions: [
      [2125, 2578],
      [2125, 2679],
      [1954, 2679],
      [1954, 2578],
    ],
    showDetailButton: false,
  },
  {
    id: "komcee_west",
    name: "21KOMCEE West",
    positions: [
      [1750, 2144],
      [1750, 2309],
      [1537, 2309],
      [1537, 2144],
    ],
    showDetailButton: true,
  },
  {
    id: "komcee_east",
    name: "21KOMCEE East",
    positions: [
      [1715, 2342],
      [1715, 2443],
      [1352, 2443],
      [1352, 2243],
      [1451, 2243],
      [1451, 2342],
    ],
    showDetailButton: true,
  },
  {
    id: "building900",
    name: "900番講堂",
    positions: [
      [860, 1373],
      [763, 1373],
      [763, 1493],
      [739, 1493],
      [739, 1558],
      [877, 1558],
      [877, 1494],
      [860, 1494],
    ],
    showDetailButton: true,
  },
  {
    id: "info_edu",
    name: "情報教育棟",
    positions: [
      [482, 1434],
      [381, 1434],
      [381, 1772],
      [482, 1772],
    ],
    showDetailButton: true,
  },
  {
    id: "administration",
    name: "アドミニストレーション棟",
    positions: [
      [723, 2071],
      [723, 2304],
      [647, 2310],
      [647, 2418],
      [565, 2418],
      [565, 2071],
    ],
    showDetailButton: true,
  },
  {
    id: "comipla_north",
    name: "コミプラ北館",
    positions: [
      [1395, 2593],
      [1395, 2979],
      [1305, 2979],
      [1305, 2593],
    ],
    showDetailButton: true,
  },
  {
    id: "second_gymnasium",
    name: "第二体育館",
    positions: [
      [1478, 2602],
      [1482, 2770],
      [1780, 2774],
      [1774, 2600],
    ],
    showDetailButton: true,
  },
  {
    id: "first_gymnasium",
    name: "第一体育館",
    positions: [
      [1798, 2924],
      [1632, 2922],
      [1632, 3052],
      [1804, 3054],
    ],
    showDetailButton: true,
  },
  {
    id: "campus_plaza_a",
    name: "キャンパスプラザA棟",
    positions: [
      [1556, 2784],
      [1458, 2794],
      [1444, 2858],
      [1558, 2858],
    ],
    showDetailButton: true,
  },
  {
    id: "campus_plaza_b",
    name: "キャンパスプラザB棟",
    positions: [
      [1452, 2908],
      [1446, 2978],
      [1564, 2978],
      [1558, 2908],
    ],
    showDetailButton: true,
  },
  {
    id: "komaba_museum",
    name: "駒場博物館",
    positions: [
      [878, 2242],
      [754, 2241],
      [760, 2430],
      [880, 2431],
    ],
    showDetailButton: true,
  },
  {
    id: "advanced_research_lab",
    name: "アドバンスト・リサーチ・ラボラトリー",
    positions: [
      [1825, 1682],
      [1890, 1678],
      [1897, 1536],
      [1826, 1540],
    ],
    showDetailButton: false,
  },
  {
    id: "komaba_international_edu",
    name: "駒場国際教育研究棟",
    positions: [
      [1449, 1096],
      [1355, 1101],
      [1357, 1399],
      [1444, 1401],
    ],
    showDetailButton: true,
  },
  {
    id: "komaba_health_center",
    name: "駒場保健センター",
    positions: [
      [575, 1484],
      [524, 1484],
      [524, 1593],
      [577, 1591],
    ],
    showDetailButton: true,
  },
  {
    id: "coop_cafeteria",
    name: "生協食堂",
    positions: [
      [1250, 2495],
      [1013, 2498],
      [1017, 2637],
      [1086, 2660],
      [1250, 2665],
    ],
    showDetailButton: true,
  },
];

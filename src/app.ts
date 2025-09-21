import L, { type LatLngBoundsExpression } from "leaflet";

// 画像のピクセルサイズ（例：キャンパス図 2000x1400）
const imgWidth = 4000,
  imgHeight = 2800;

// CRS.Simple（独自座標）で地図を作る
const map = L.map("map", { crs: L.CRS.Simple, minZoom: -2 });

// 画像を貼るための座標領域（左上[0,0]〜右下[高さ,幅]）
const bounds: LatLngBoundsExpression = [
  [0, 0],
  [imgHeight, imgWidth],
];

// 画像オーバーレイ
L.imageOverlay("/komabamap.svg", bounds).addTo(map);
map.fitBounds(bounds);

// クリックした位置の座標（マーカー配置の補助）
map.on("click", (e) => {
  const { lat, lng } = e.latlng; // CRS.Simple でも lat=Y, lng=X
  console.log("clicked:", lat, lng);
  L.marker([lat, lng])
    .addTo(map)
    .bindPopup(`X:${lat.toFixed(0)} Y:${lng.toFixed(0)}`);
});

// 例：図書館にマーカー（画像座標で指定）
L.marker([900, 1900]).addTo(map).bindPopup("一号館");
// 透明のポリゴンを置いて、ポップアップにHTMLを埋め込む
const library = L.polygon(
  [
    [1024, 2687],
    [1019, 2904],
    [858, 2904],
    [854, 2692],
  ],
  {
    color: "transparent", //枠線の色を透明に
    fillOpacity: 0, //塗りの透明度を0に
  },
).addTo(map).bindPopup(`
    <div style="text-align:center;">
      <p><b>図書館</b></p>
      <a href="path" target="_blank">
        <img src="path" alt="図書館構造図" width="120" />
      </a>
    </div>
    `);

const Bldg1 = L.polygon(
  [
    [1193, 1727],
    [935, 1727],
    [935, 2082],
    [1193, 2082],
  ],
  {
    color: "transparent",
    fillOpacity: 0,
  },
).addTo(map).bindPopup(`
    <div style="text-align:center;">
      <p><b>1号館</b></p>
      <a href="/buildings/1号館.svg" target="_blank">
        階層図
      </a>
    </div>
    `);

const Bldg101 = L.polygon(
  [
    [1181, 2177],
    [1181, 2423],
    [1115, 2423],
    [1115, 2177],
  ],
  {
    color: "transparent",
    fillOpacity: 0,
  },
).addTo(map).bindPopup(`
    <div style="text-align:center;">
      <p><b>101号館</b></p>
      <a href="path" target="_blank">
        階層図
      </a>
    </div>
    `);

const Bldg2 = L.polygon(
  [
    [964, 1017],
    [879, 1017],
    [879, 1173],
    [964, 1173],
  ],
  {
    color: "transparent",
    fillOpacity: 0,
  },
).addTo(map).bindPopup(`
    <div style="text-align:center;">
      <p><b>2号館</b></p>
      <a href="path" target="_blank">
        階層図
      </a>
    </div>
    `);

const bldg5 = L.polygon(
  [
    [1612, 1352],
    [1506, 1353],
    [1505, 1625],
    [1613, 1624],
  ],
  {
    color: "transparent", //枠線の色を透明に
    fillOpacity: 0, //塗りの透明度を0に
  },
).addTo(map).bindPopup(`
    <div style="text-align:center;">
      <p><b>5号館</b></p>
      <a href="/buildings/5号館.svg" target="_blank">
        階層図
      </a>
    </div>
    `);

const bldg7 = L.polygon(
  [
    [1461, 1557],
    [1342, 1558],
    [1341, 1733],
    [1461, 1732],
  ],
  {
    color: "transparent", //枠線の色を透明に
    fillOpacity: 0, //塗りの透明度を0に
  },
).addTo(map).bindPopup(`
    <div style="text-align:center;">
      <p><b>7号館</b></p>
      <a href="/buildings/7号館.svg" target="_blank">
        階層図
      </a>
    </div>
    `);

const Bldg8 = L.polygon(
  [
    [1438, 1941],
    [1438, 2205],
    [1349, 2205],
    [1349, 1941],
  ],
  {
    color: "transparent", //枠線の色を透明に
    fillOpacity: 0, //塗りの透明度を0に
  },
).addTo(map).bindPopup(`
    <div style="text-align:center;">
      <p><b>8号館</b></p>
      <a href="path" target="_blank">
        階層図
      </a>
    </div>
    `);

const Bldg9 = L.polygon(
  [
    [1618, 1839],
    [1618, 2109],
    [1521, 2109],
    [1521, 1839],
  ],
  {
    color: "transparent", //枠線の色を透明に
    fillOpacity: 0, //塗りの透明度を0に
  },
).addTo(map).bindPopup(`
    <div style="text-align:center;">
      <p><b>9号館</b></p>
      <a href="path" target="_blank">
        階層図
      </a>
    </div>
    `);

const Bldg10 = L.polygon(
  [
    [1473, 1753],
    [1473, 1895],
    [1328, 1895],
    [1328, 1753],
  ],
  {
    color: "transparent", //枠線の色を透明に
    fillOpacity: 0, //塗りの透明度を0に
  },
).addTo(map).bindPopup(`
    <div style="text-align:center;">
      <p><b>10号館</b></p>
      <a href="/buildings/Bldg10.svg" target="_blank">
        階層図
      </a>
    </div>
    `);

const Bldg11 = L.polygon(
  [
    [1194, 1510],
    [1194, 1624],
    [1015, 1624],
    [1015, 1510],
  ],
  {
    color: "transparent",
    fillOpacity: 0,
  },
).addTo(map).bindPopup(`
    <div style="text-align:center;">
      <p><b>11号館</b></p>
      <a href="/buildings/Bldg11.svg" target="_blank">
        階層図
      </a>
    </div>
    `);

const Bldg12 = L.polygon(
  [
    [1086, 1210],
    [1086, 1325],
    [948, 1325],
    [948, 1210],
  ],
  {
    color: "transparent",
    fillOpacity: 0,
  },
).addTo(map).bindPopup(`
    <div style="text-align:center;">
      <p><b>12号館</b></p>
      <a href="/buildings/12号館.svg" target="_blank">
        階層図
      </a>
    </div>
    `);

const Bldg13 = L.polygon(
  [
    [1217, 1209],
    [1217, 1420],
    [1121, 1420],
    [1121, 1209],
  ],
  {
    color: "transparent",
    fillOpacity: 0,
  },
).addTo(map).bindPopup(`
    <div style="text-align:center;">
      <p><b>13号館</b></p>
      <a href="/buildings/Bldg13.svg" target="_blank">
        階層図
      </a>
    </div>
    `);

const Bldg14 = L.polygon(
  [
    [1222, 992],
    [1215, 1155],
    [1126, 1155],
    [1126, 1057],
    [1018, 1057],
    [1018, 989],
  ],
  {
    color: "transparent",
    fillOpacity: 0,
  },
).addTo(map).bindPopup(`
    <div style="text-align:center;">
      <p><b>14号館</b></p>
      <a href="path" target="_blank">
        階層図
      </a>
    </div>
    `);

const bldg17 = L.polygon(
  [
    [1589, 1136],
    [1487, 1136],
    [1486, 1308],
    [1588, 1308],
  ],
  {
    color: "transparent", //枠線の色を透明に
    fillOpacity: 0, //塗りの透明度を0に
  },
).addTo(map).bindPopup(`
    <div style="text-align:center;">
      <p><b>17号館</b></p>
      <a href="/buildings/17%E5%8F%B7%E9%A4%A8.svg" target="_blank">
        階層図
      </a>
    </div>
    `);

const Bldg18 = L.polygon(
  [
    [1763, 1718],
    [1763, 1913],
    [1665, 1913],
    [1665, 1823],
    [1523, 1818],
    [1519, 1720],
  ],
  {
    color: "transparent", //枠線の色を透明に
    fillOpacity: 0, //塗りの透明度を0に
  },
).addTo(map).bindPopup(`
    <div style="text-align:center;">
      <p><b>18号館</b></p>
      <a href="path" target="_blank">
        階層図
      </a>
    </div>
    `);

const Bldg19 = L.polygon(
  [
    [2125, 2578],
    [2125, 2679],
    [1954, 2679],
    [1954, 2578],
  ],
  {
    color: "transparent", //枠線の色を透明に
    fillOpacity: 0, //塗りの透明度を0に
  },
).addTo(map).bindPopup(`
    <div style="text-align:center;">
      <p><b>19号館</b></p>
      <a href="path" target="_blank">
        階層図
      </a>
    </div>
    `);

const KOMCEE21West = L.polygon(
  [
    [1750, 2144],
    [1750, 2309],
    [1537, 2309],
    [1537, 2144],
  ],
  {
    color: "transparent", //枠線の色を透明に
    fillOpacity: 0, //塗りの透明度を0に
  },
).addTo(map).bindPopup(`
    <div style="text-align:center;">
      <p><b>21KOMCEE West</b></p>
      <a href="/buildings/21KOMCEE%20West.svg" target="_blank">
        階層図
      </a>
    </div>
    `);

const KOMCEE21East = L.polygon(
  [
    [1715, 2342],
    [1715, 2443],
    [1352, 2443],
    [1352, 2243],
    [1451, 2243],
    [1451, 2342],
  ],
  {
    color: "transparent", //枠線の色を透明に
    fillOpacity: 0, //塗りの透明度を0に
  },
).addTo(map).bindPopup(`
    <div style="text-align:center;">
      <p><b>21KOMCEE East</b></p>
      <a href="/buildings/21KOMCEE%20East.svg" target="_blank">
        階層図
      </a>
    </div>
    `);

const ClassRoom900 = L.polygon(
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
  {
    color: "transparent",
    fillOpacity: 0,
  },
).addTo(map).bindPopup(`
    <div style="text-align:center;">
      <p><b>900番講堂</b></p>
      <a href="/buildings/900%E7%95%AA%E8%AC%9B%E5%A0%82.svg" target="_blank">
        階層図
      </a>
    </div>
    `);

const InfoEduBuild = L.polygon(
  [
    [482, 1434],
    [381, 1434],
    [381, 1772],
    [482, 1772],
  ],
  {
    color: "transparent",
    fillOpacity: 0,
  },
).addTo(map).bindPopup(`
    <div style="text-align:center;">
      <p><b>情報教育棟</b></p>
      <a href="/buildings/InfoEduBuild.svg" target="_blank">
        階層図
      </a>
    </div>
    `);

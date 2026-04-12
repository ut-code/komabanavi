import React, { useEffect, useMemo, useRef, useState } from "react";
import L from "leaflet";
import {
  MapContainer,
  ImageOverlay,
  Marker,
  Popup,
  Polygon,
  Circle,
  useMap,
} from "react-leaflet";
import "leaflet/dist/leaflet.css";
import { useSearchParams } from "react-router-dom";
import { Komabamap } from "../assets";
import UtcFavicon from "../assets/utc-favicon.svg";
import { useGeolocation } from "../geolocation";
import {
  buildingPolygons,
  waterServerMarkers,
  waterServerIcon,
  vendingMachineMarkers,
  orangeIcon,
} from "../markers";
import { searchItems, type SearchableItem } from "../search";
import { getBuildingCenter } from "../buildings";
import "leaflet-smooth-zoom/SmoothWheelZoom.js";

const imgWidth = 4000;
const imgHeight = 2800;
const bounds: L.LatLngBoundsExpression = [
  [0, 0],
  [imgHeight, imgWidth],
];

// Component to handle map interactions like flyTo
function MapController({
  selectedItem,
  initialParams,
}: {
  selectedItem: SearchableItem | null;
  initialParams: {
    buildingId: string | null;
    lat: string | null;
    lng: string | null;
    zoom: string | null;
  };
}) {
  const map = useMap();
  const initialProcessed = useRef(false);

  useEffect(() => {
    if (initialProcessed.current) return;

    const { buildingId, lat, lng, zoom } = initialParams;

    if (buildingId) {
      const center = getBuildingCenter(buildingId);
      if (center) {
        map.flyTo([center[0], center[1]], 0, { duration: 1.5 });

        // Show popup with pin
        const buildingItem = searchItems(buildingId).find(
          (item) => item.buildingId === buildingId,
        );
        if (buildingItem && buildingItem.buildingId) {
          const popupContent = `
            <div style="text-align: center;">
              <p style="margin: 0 0 8px 0; font-weight: bold;">${buildingItem.name}</p>
              <a href="/building/${buildingItem.buildingId}" style="display: inline-block; padding: 8px 16px; background-color: #3b82f6; color: white; border-radius: 6px; text-decoration: none;">詳細</a>
            </div>
          `;
          L.popup()
            .setLatLng([center[0], center[1]])
            .setContent(popupContent)
            .openOn(map);
        }
      }
    } else if (lat && lng) {
      const position: [number, number] = [Number(lat), Number(lng)];
      const zoomLevel = zoom ? Number(zoom) : 0;
      map.flyTo(position, zoomLevel, { duration: 1.5 });

      L.popup()
        .setLatLng(position)
        .setContent(`<b>共有された位置</b>`)
        .openOn(map);
    }

    initialProcessed.current = true;
  }, [map, initialParams]);

  useEffect(() => {
    if (selectedItem) {
      // Fly to the selected item's location
      map.flyTo([selectedItem.lat, selectedItem.lng], 0, {
        duration: 1.5,
      });

      // If it's a building with a detail page, show a popup with link
      if (selectedItem.type === "building" && selectedItem.buildingId) {
        const shareUrl = `${window.location.origin}/?building=${selectedItem.buildingId}`;
        L.popup()
          .setLatLng([selectedItem.lat, selectedItem.lng])
          .setContent(
            `
            <div style="text-align: center;">
              <p style="margin: 0 0 8px 0; font-weight: bold;">${selectedItem.name}</p>
              <button onclick="navigator.clipboard.writeText('${shareUrl}').then(()=>alert('URLをコピーしました！')).catch(()=>{})" style="display: inline-block; padding: 8px 16px; background-color: #3b82f6; color: white; border-radius: 6px; text-decoration: none; border: none; cursor: pointer; margin-bottom: 8px;">
                共有
              </button>
              <br/>
              <a href="/building/${selectedItem.buildingId}" style="display: inline-block; padding: 8px 16px; background-color: #3b82f6; color: white; border-radius: 6px; text-decoration: none;">詳細</a>
            </div>
          `,
          )
          .openOn(map);
      } else {
        // Show popup for water servers and vending machines
        L.popup()
          .setLatLng([selectedItem.lat, selectedItem.lng])
          .setContent(
            `<b>${selectedItem.name}</b>${selectedItem.description ? `<br>${selectedItem.description}` : ""}`,
          )
          .openOn(map);
      }
    }
  }, [selectedItem, map]);

  return null;
}

function UserLocation() {
  // デバッグ用: 環境変数で現在地を固定座標に設定可能
  // 例: VITE_DEBUG_POSITION=1400,2000
  const debugPos = useMemo(
    () =>
      import.meta.env.VITE_DEBUG_POSITION?.split(",").map(Number) as [
        number,
        number,
      ],
    [],
  );

  const geoOptions = debugPos ? { debugPosition: debugPos } : {};

  const { position, accuracy } = useGeolocation(
    imgWidth,
    imgHeight,
    geoOptions,
  );

  if (!position) return null;

  const dotIcon = L.divIcon({
    className: "user-location-dot",
    html: `<div style="
      width: 16px;
      height: 16px;
      background: #3b82f6;
      border: 3px solid white;
      border-radius: 50%;
      box-shadow: 0 0 6px rgba(59,130,246,0.6);
    "></div>`,
    iconSize: [16, 16],
    iconAnchor: [8, 8],
  });

  return (
    <>
      <Marker position={position} icon={dotIcon} zIndexOffset={1000}>
        <Popup>Current Location</Popup>
      </Marker>
      {/*精度円 (accuracy radius in meters, but since this is a custom CRS map, we use a visual radius in pixels)*/}
      <Circle
        center={position}
        radius={Math.max(accuracy, 10)}
        pathOptions={{
          color: "#3b82f6",
          fillColor: "#3b82f6",
          fillOpacity: 0.2,
          weight: 2,
        }}
      />
    </>
  );
}

export function MapPage() {
  const [wsMarkersVisible, setWsMarkersVisible] = useState(false);
  const [vmMarkersVisible, setVmMarkersVisible] = useState(false);
  const [sidebarOpen, setSidebarOpen] = useState(false);
  const [searchQuery, setSearchQuery] = useState("");
  const [searchResults, setSearchResults] = useState<SearchableItem[]>([]);
  const [selectedItem, setSelectedItem] = useState<SearchableItem | null>(null);
  const [searchParams] = useSearchParams();

  // Process URL parameters for sharing location
  const initialParams = {
    buildingId: searchParams.get("building"),
    lat: searchParams.get("lat"),
    lng: searchParams.get("lng"),
    zoom: searchParams.get("zoom"),
  };

  const handleSearch = (query: string) => {
    setSearchQuery(query);
    const results = searchItems(query);
    setSearchResults(results);
  };

  const handleSelectItem = (item: SearchableItem) => {
    setSelectedItem(item);
    setSearchQuery("");
    setSearchResults([]);
    setSidebarOpen(false);
  };

  const wsLabel = wsMarkersVisible ? "給水機を非表示" : "給水機を表示";
  const vmLabel = vmMarkersVisible ? "自動販売機を非表示" : "自動販売機を表示";

  return (
    <div className="w-full h-screen relative">
      <MapContainer
        crs={L.CRS.Simple}
        minZoom={-3}
        center={[imgHeight / 2, imgWidth / 2]}
        zoom={-1}
        className="w-full h-full"
        scrollWheelZoom={false}
        // @ts-expect-error https://github.com/mutsuyuki/Leaflet.SmoothWheelZoom プラグインで提供されるオプション
        smoothWheelZoom={true}
        smoothSensitivity={5}
        zoomSnap={0}
      >
        <ImageOverlay url={Komabamap} bounds={bounds} />
        <MapController
          selectedItem={selectedItem}
          initialParams={initialParams}
        />
        <UserLocation />

        {buildingPolygons.map((poly) => (
          <Polygon
            key={poly.id}
            positions={poly.positions}
            pathOptions={{ color: "transparent", fillOpacity: 0 }}
          >
            <Popup>
              <div style={{ textAlign: "center", padding: "8px" }}>
                <p
                  style={{
                    margin: "0 0 4px 0",
                    fontWeight: "bold",
                    fontSize: "16px",
                  }}
                >
                  {poly.name}
                </p>
                <button
                  onClick={() => {
                    const shareUrl = `${window.location.origin}/?building=${poly.id}`;
                    navigator.clipboard
                      .writeText(shareUrl)
                      .then(() => alert("URLをコピーしました！"));
                  }}
                  style={{
                    display: "inline-block",
                    marginTop: "8px",
                    padding: "8px 16px",
                    backgroundColor: "#3b82f6",
                    color: "white",
                    border: "none",
                    borderRadius: "6px",
                    fontSize: "14px",
                    fontWeight: "600",
                    cursor: "pointer",
                    marginRight: "8px",
                  }}
                >
                  共有
                </button>
                {poly.showDetailButton && (
                  <a
                    href={`/building/${poly.id}`}
                    style={{
                      display: "inline-block",
                      marginTop: "8px",
                      padding: "8px 16px",
                      backgroundColor: "#3b82f6",
                      color: "white",
                      borderRadius: "6px",
                      fontSize: "14px",
                      fontWeight: "600",
                      textDecoration: "none",
                    }}
                  >
                    詳細
                  </a>
                )}
              </div>
            </Popup>
          </Polygon>
        ))}

        {wsMarkersVisible &&
          waterServerMarkers.map((marker, idx) => (
            <Marker
              key={`ws-${idx}`}
              position={marker.position}
              icon={waterServerIcon}
            >
              {marker.popup && <Popup>{marker.popup}</Popup>}
            </Marker>
          ))}

        {vmMarkersVisible &&
          vendingMachineMarkers.map((marker, idx) => (
            <Marker
              key={`vm-${idx}`}
              position={marker.position}
              icon={orangeIcon}
            >
              {marker.popup && <Popup>{marker.popup}</Popup>}
            </Marker>
          ))}
      </MapContainer>

      {/* 検索ボックス（常時表示） */}
      <div className="fixed top-2 left-16 right-16 z-[2100] max-w-2xl mx-auto">
        <div className="search-input-wrapper bg-white rounded-lg shadow-lg">
          <svg
            className="search-icon w-4 h-4"
            viewBox="0 0 24 24"
            fill="none"
            stroke="currentColor"
            strokeWidth="2"
            strokeLinecap="round"
          >
            <circle cx="11" cy="11" r="8" />
            <line x1="21" y1="21" x2="16.65" y2="16.65" />
          </svg>
          <input
            className="sidebar-search-input"
            type="text"
            value={searchQuery}
            onChange={(e) => handleSearch(e.target.value)}
            placeholder="建物・施設を検索"
          />
        </div>

        {/* 検索結果表示 */}
        {searchQuery && searchResults.length > 0 && (
          <div className="search-results max-h-96 overflow-y-auto mt-2 shadow-lg">
            {searchResults.map((item) => (
              <button
                key={item.id}
                className="search-result-item w-full text-left px-3 py-2 rounded-md hover:bg-gray-100 cursor-pointer text-sm"
                onClick={() => handleSelectItem(item)}
              >
                <div className="font-medium text-gray-800">{item.name}</div>
                {item.description && (
                  <div className="text-xs text-gray-500 mt-0.5">
                    {item.description}
                  </div>
                )}
                <div className="text-xs text-gray-400 mt-0.5 flex items-center gap-1">
                  {item.type === "building" && (
                    <>
                      <svg
                        className="w-3 h-3"
                        viewBox="0 0 24 24"
                        fill="none"
                        stroke="currentColor"
                        strokeWidth="2"
                      >
                        <path d="M3 21h18" />
                        <path d="M5 21V7l8-4v18" />
                        <path d="M19 21V11l-6-4" />
                        <path d="M9 9h1" />
                        <path d="M9 13h1" />
                        <path d="M9 17h1" />
                      </svg>
                      建物
                    </>
                  )}
                  {item.type === "waterServer" && (
                    <>
                      <svg
                        className="w-3 h-3"
                        viewBox="0 0 24 24"
                        fill="none"
                        stroke="currentColor"
                        strokeWidth="2"
                      >
                        <path d="M12 2v6" />
                        <path d="M8 8h8" />
                        <path d="M7 8v8a5 5 0 0 0 10 0V8z" />
                      </svg>
                      ウォーターサーバー
                    </>
                  )}
                  {item.type === "vendingMachine" && (
                    <>
                      <svg
                        className="w-3 h-3"
                        viewBox="0 0 24 24"
                        fill="none"
                        stroke="currentColor"
                        strokeWidth="2"
                      >
                        <rect x="4" y="2" width="16" height="20" rx="2" />
                        <line x1="4" y1="10" x2="20" y2="10" />
                        <rect x="7" y="4" width="4" height="4" rx="0.5" />
                        <rect x="13" y="4" width="4" height="4" rx="0.5" />
                      </svg>
                      自動販売機
                    </>
                  )}
                </div>
              </button>
            ))}
          </div>
        )}

        {/* 検索結果が0件の場合 */}
        {searchQuery && searchResults.length === 0 && (
          <div className="bg-white rounded-lg shadow-lg text-center text-gray-500 text-sm py-3 mt-2">
            該当する結果が見つかりませんでした
          </div>
        )}
      </div>

      {/* サイドバーを開くメニューボタン */}
      <button
        className="sidebar-toggle-btn"
        onClick={() => setSidebarOpen(true)}
        aria-label="メニューを開く"
      >
        <svg
          className="w-5 h-5"
          viewBox="0 0 24 24"
          fill="none"
          stroke="currentColor"
          strokeWidth="2.5"
          strokeLinecap="round"
        >
          <line x1="3" y1="6" x2="21" y2="6" />
          <line x1="3" y1="12" x2="21" y2="12" />
          <line x1="3" y1="18" x2="21" y2="18" />
        </svg>
      </button>

      {/* サイドバーオーバーレイ＋ドロワー */}
      {sidebarOpen && (
        <>
          <div
            className="sidebar-overlay"
            style={{ background: "rgba(0,0,0,0.3)" }}
            onClick={() => setSidebarOpen(false)}
          />
          <aside className="sidebar-drawer open">
            {/* ヘッダー：閉じるボタン */}
            <div className="sidebar-header">
              <button
                className="sidebar-close-btn"
                onClick={() => setSidebarOpen(false)}
                aria-label="閉じる"
              >
                <svg
                  className="w-4 h-4"
                  viewBox="0 0 24 24"
                  fill="none"
                  stroke="currentColor"
                  strokeWidth="2.5"
                  strokeLinecap="round"
                >
                  <line x1="18" y1="6" x2="6" y2="18" />
                  <line x1="6" y1="6" x2="18" y2="18" />
                </svg>
              </button>
            </div>

            {/* コンテンツエリア */}
            <div className="sidebar-content">
              {/* 表示トグルセクション */}
              <div className="sidebar-section">
                <button
                  className="sidebar-feature-btn"
                  onClick={() => setWsMarkersVisible(!wsMarkersVisible)}
                >
                  {/* ウォーターサーバーSVGアイコン */}
                  <svg
                    className="w-5 h-5 text-blue-500"
                    viewBox="0 0 24 24"
                    fill="none"
                    stroke="currentColor"
                    strokeWidth="2"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                  >
                    <path d="M12 2v6" />
                    <path d="M8 8h8" />
                    <path d="M7 8v8a5 5 0 0 0 10 0V8z" />
                    <path d="M9 18h6" />
                    <path d="M10 2h4" />
                  </svg>
                  <span>{wsLabel}</span>
                </button>
                <button
                  className="sidebar-feature-btn"
                  onClick={() => setVmMarkersVisible(!vmMarkersVisible)}
                >
                  {/* 自動販売機SVGアイコン */}
                  <svg
                    className="w-5 h-5 text-orange-500"
                    viewBox="0 0 24 24"
                    fill="none"
                    stroke="currentColor"
                    strokeWidth="2"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                  >
                    <rect x="4" y="2" width="16" height="20" rx="2" />
                    <line x1="4" y1="10" x2="20" y2="10" />
                    <rect x="7" y="4" width="4" height="4" rx="0.5" />
                    <rect x="13" y="4" width="4" height="4" rx="0.5" />
                    <rect x="7" y="12" width="10" height="4" rx="0.5" />
                    <line x1="8" y1="19" x2="8" y2="19" />
                    <line x1="16" y1="19" x2="16" y2="19" />
                  </svg>
                  <span>{vmLabel}</span>
                </button>
              </div>

              {/* ヘルプリンクセクション */}
              <div className="sidebar-section sidebar-section--help">
                <a href="/usage" className="sidebar-help-link">
                  <svg
                    className="w-5 h-5 text-gray-500"
                    viewBox="0 0 24 24"
                    fill="none"
                    stroke="currentColor"
                    strokeWidth="2"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                  >
                    <circle cx="12" cy="12" r="10" />
                    <path d="M9.09 9a3 3 0 0 1 5.83 1c0 2-3 3-3 3" />
                    <line x1="12" y1="17" x2="12.01" y2="17" />
                  </svg>
                  <span>使い方</span>
                </a>
              </div>

              {/* 免責事項リンクセクション */}
              <div className="sidebar-section sidebar-section--help">
                <a href="/disclaimer" className="sidebar-help-link">
                  <svg
                    className="w-5 h-5 text-gray-500"
                    viewBox="0 0 24 24"
                    fill="none"
                    stroke="currentColor"
                    strokeWidth="2"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                  >
                    <path d="M10.29 3.86L1.82 18a2 2 0 0 0 1.71 3h16.94a2 2 0 0 0 1.71-3L13.71 3.86a2 2 0 0 0-3.42 0z" />
                    <line x1="12" y1="9" x2="12" y2="13" />
                    <line x1="12" y1="17" x2="12.01" y2="17" />
                  </svg>
                  <span>免責事項</span>
                </a>
              </div>

              {/* フィードバックリンクセクション */}
              <div className="sidebar-section sidebar-section--help">
                <a
                  href="https://forms.gle/FYZ5utc5Tfmnfe6CA"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="sidebar-help-link"
                >
                  <svg
                    className="w-5 h-5 text-gray-500"
                    viewBox="0 0 24 24"
                    fill="none"
                    stroke="currentColor"
                    strokeWidth="2"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                  >
                    <path d="M21 15a2 2 0 0 1-2 2H7l-4 4V5a2 2 0 0 1 2-2h14a2 2 0 0 1 2 2z" />
                  </svg>
                  <span>フィードバックを送る</span>
                </a>
              </div>

              {/* UTCodeリンクセクション */}
              <div className="sidebar-section sidebar-section--github">
                <a
                  href="https://utcode.net"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="sidebar-github-link"
                >
                  <img
                    src={UtcFavicon}
                    alt="ut.code()"
                    width="20"
                    height="24"
                  />
                  <span>ut.code(); ホームページ</span>
                </a>
              </div>

              {/* GitHubリンクセクション */}
              <div className="sidebar-section sidebar-section--github">
                <a
                  href="https://github.com/ut-code/komabanavi"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="sidebar-github-link"
                >
                  <svg
                    aria-hidden="true"
                    height="20"
                    viewBox="0 0 16 16"
                    width="20"
                  >
                    <path
                      fillRule="evenodd"
                      fill="#555"
                      d="M8 0C3.58 0 0 3.58 0 8c0 3.54 2.29 6.53 5.47 7.59.4.07.55-.17.55-.38 0-.19-.01-.82-.01-1.49C4 14.09 3.48 12.81 3.34 12.35c-.09-.23-.48-.95-.82-1.15-.28-.15-.68-.52-.01-.53.63-.01 1.08.58 1.23.82.72 1.21 1.87.87 2.33.66.07-.52.28-.87.51-1.07-1.78-.2-3.64-.89-3.64-3.95 0-.87.31-1.59.82-2.15-.08-.2-.36-1.02.08-2.13 0 0 .67-.21 2.2.82.64-.18 1.32-.27 2-.27.68 0 1.36.09 2 .27 1.53-1.03 2.2-.82 2.2-.82.44 1.11.16 1.93.08 2.13.51.56.82 1.27.82 2.15 0 3.07-1.87 3.75-3.65 3.95.29.25.54.73.54 1.48 0 1.07-.01 1.93-.01 2.2 0 .21.15.46.55.38A8.013 8.013 0 0 0 16 8c0-4.42-3.58-8-8-8z"
                    />
                  </svg>
                  <span>GitHubリポジトリ</span>
                </a>
              </div>
            </div>
          </aside>
        </>
      )}
    </div>
  );
}

import React, { useEffect, useRef, useState } from "react";
import L from "leaflet";
import { Komabamap } from "../assets";
import { setupGeolocation } from "../geolocation";
import {
  setupBuildingPolygons,
  setupWaterServerMarkers,
  setupVendingMachineMarkers,
  toggleMarkers,
} from "../markers";
import { searchItems, type SearchableItem } from "../search";

const imgWidth = 4000;
const imgHeight = 2800;

export function MapPage() {
  const mapRef = useRef<L.Map | null>(null);
  const containerRef = useRef<HTMLDivElement>(null);
  const wsMarkersRef = useRef<L.Marker[]>([]);
  const vmMarkersRef = useRef<L.Marker[]>([]);
  const [wsMarkersVisible, setWsMarkersVisible] = useState(false);
  const [vmMarkersVisible, setVmMarkersVisible] = useState(false);
  const [sidebarOpen, setSidebarOpen] = useState(false);
  const [searchQuery, setSearchQuery] = useState("");
  const [searchResults, setSearchResults] = useState<SearchableItem[]>([]);
  const [selectedItem, setSelectedItem] = useState<SearchableItem | null>(null);

  useEffect(() => {
    if (!containerRef.current) return;
    const map = L.map(containerRef.current, { crs: L.CRS.Simple, minZoom: -2 });
    const bounds: L.LatLngBoundsExpression = [
      [0, 0],
      [imgHeight, imgWidth],
    ];
    L.imageOverlay(Komabamap, bounds).addTo(map);
    map.fitBounds(bounds);
    mapRef.current = map;
    setupGeolocation(map);
    const wsMarkers = setupWaterServerMarkers(map);
    wsMarkersRef.current = wsMarkers.markers;
    const vmMarkers = setupVendingMachineMarkers(map);
    vmMarkersRef.current = vmMarkers.markers;
    setupBuildingPolygons(map);
    return () => {
      map.remove();
      mapRef.current = null;
    };
  }, []);

  const handleWsMarkerToggle = () => {
    if (mapRef.current) {
      const newVisible = toggleMarkers(
        mapRef.current,
        wsMarkersRef.current,
        wsMarkersVisible,
      );
      setWsMarkersVisible(newVisible);
    }
  };
  const handleVmMarkerToggle = () => {
    if (mapRef.current) {
      const newVisible = toggleMarkers(
        mapRef.current,
        vmMarkersRef.current,
        vmMarkersVisible,
      );
      setVmMarkersVisible(newVisible);
    }
  };

  const handleSearch = (query: string) => {
    setSearchQuery(query);
    const results = searchItems(query);
    setSearchResults(results);
  };

  const handleSelectItem = (item: SearchableItem) => {
    setSelectedItem(item);
    if (mapRef.current) {
      // Fly to the selected item's location
      mapRef.current.flyTo([item.lat, item.lng], 0, {
        duration: 1.5,
      });

      // If it's a building with a detail page, show a popup with link
      if (item.type === "building" && item.buildingId) {
        L.popup()
          .setLatLng([item.lat, item.lng])
          .setContent(
            `
            <div style="text-align: center;">
              <p style="margin: 0 0 8px 0; font-weight: bold;">${item.name}</p>
              <a href="/building/${item.buildingId}" style="display: inline-block; padding: 8px 16px; background-color: #3b82f6; color: white; border-radius: 6px; text-decoration: none;">階層図を表示</a>
            </div>
          `,
          )
          .openOn(mapRef.current);
      } else {
        // Show popup for water servers and vending machines
        L.popup()
          .setLatLng([item.lat, item.lng])
          .setContent(
            `<b>${item.name}</b>${item.description ? `<br>${item.description}` : ""}`,
          )
          .openOn(mapRef.current);
      }
    }
    // Close sidebar after selection
    setSidebarOpen(false);
  };

  // サイドバー内部ボタンのラベルを状態依存で切替
  const wsLabel = wsMarkersVisible
    ? "ウォーターサーバーを非表示"
    : "ウォーターサーバーを表示";
  const vmLabel = vmMarkersVisible ? "自動販売機を非表示" : "自動販売機を表示";

  return (
    <div className="w-full h-screen relative">
      {/* Map背景 */}
      <div ref={containerRef} className="w-full h-full" />

      {/* サイドバーを開くメニューボタン */}
      <button
        className="sidebar-toggle-btn"
        onClick={() => setSidebarOpen(true)}
        aria-label="メニューを開く"
      >
        <svg
          className="w-6 h-6"
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
              {/* 検索セクション */}
              <div className="sidebar-section">
                <div className="search-input-wrapper">
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
                  <div className="search-results max-h-48 overflow-y-auto">
                    {searchResults.map((item) => (
                      <button
                        key={item.id}
                        className="search-result-item w-full text-left px-3 py-2 rounded-md hover:bg-gray-100 cursor-pointer text-sm"
                        onClick={() => handleSelectItem(item)}
                      >
                        <div className="font-medium text-gray-800">
                          {item.name}
                        </div>
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
                  <div className="text-center text-gray-500 text-sm py-3">
                    該当する結果が見つかりませんでした
                  </div>
                )}
              </div>

              {/* 表示トグルセクション */}
              <div className="sidebar-section">
                <button
                  className="sidebar-feature-btn"
                  onClick={handleWsMarkerToggle}
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
                  onClick={handleVmMarkerToggle}
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

              {/* GitHubリンクセクション */}
              <div className="sidebar-section sidebar-section--github">
                <a
                  href="https://github.com/tknkaa/komabanavi"
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

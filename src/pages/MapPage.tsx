import React, { useEffect, useRef, useState } from "react";
import L from "leaflet";
import * as im from "../assets";
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
    L.imageOverlay(im.Komabamap, bounds).addTo(map);
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

      {/* サイドバーを開く≡ボタン */}
      <button
        className="sidebar-toggle-btn"
        onClick={() => setSidebarOpen(true)}
        aria-label="メニューを開く"
      >
        &#x2630;
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
                ×
              </button>
            </div>

            {/* コンテンツエリア */}
            <div className="sidebar-content">
              {/* 検索セクション */}
              <div className="sidebar-section">
                <input
                  className="sidebar-search-input"
                  type="text"
                  value={searchQuery}
                  onChange={(e) => handleSearch(e.target.value)}
                  placeholder="建物・施設を検索"
                />

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
                        <div className="text-xs text-gray-400 mt-0.5">
                          {item.type === "building" && "🏢 建物"}
                          {item.type === "waterServer" &&
                            "💧 ウォーターサーバー"}
                          {item.type === "vendingMachine" && "🥤 自動販売機"}
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
                  <img
                    src={im.WaterServer}
                    alt="ウォーターサーバー"
                    className="w-5 h-5"
                  />
                  <span>{wsLabel}</span>
                </button>
                <button
                  className="sidebar-feature-btn"
                  onClick={handleVmMarkerToggle}
                >
                  <img
                    src={im.VendingMachine}
                    alt="自動販売機"
                    className="w-5 h-5"
                  />
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

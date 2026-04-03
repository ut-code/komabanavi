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
            {/* 閉じるボタン */}
            <button
              className="sidebar-close-btn"
              onClick={() => setSidebarOpen(false)}
              aria-label="閉じる"
            >
              ×
            </button>

            {/* 検索インプット：UIのみで機能未実装 */}
            <input
              className="sidebar-search-input"
              type="text"
              disabled
              placeholder="地図上で検索（未実装）"
            />

            {/* 表示トグルボタン */}
            <button
              className="sidebar-feature-btn"
              onClick={handleWsMarkerToggle}
            >
              <img
                src={im.WaterServer}
                alt="ウォーターサーバー"
                className="w-6 h-6"
              />
              {wsLabel}
            </button>
            <button
              className="sidebar-feature-btn"
              onClick={handleVmMarkerToggle}
            >
              <img
                src={im.VendingMachine}
                alt="自動販売機"
                className="w-6 h-6"
              />
              {vmLabel}
            </button>

            {/* GitHubリンク */}
            <a
              href="https://github.com/tknkaa/komabanavi"
              target="_blank"
              rel="noopener noreferrer"
              className="sidebar-github-link"
            >
              <svg
                aria-hidden="true"
                height="22"
                viewBox="0 0 16 16"
                width="22"
              >
                <path
                  fillRule="evenodd"
                  fill="#555"
                  d="M8 0C3.58 0 0 3.58 0 8c0 3.54 2.29 6.53 5.47 7.59.4.07.55-.17.55-.38 0-.19-.01-.82-.01-1.49C4 14.09 3.48 12.81 3.34 12.35c-.09-.23-.48-.95-.82-1.15-.28-.15-.68-.52-.01-.53.63-.01 1.08.58 1.23.82.72 1.21 1.87.87 2.33.66.07-.52.28-.87.51-1.07-1.78-.2-3.64-.89-3.64-3.95 0-.87.31-1.59.82-2.15-.08-.2-.36-1.02.08-2.13 0 0 .67-.21 2.2.82.64-.18 1.32-.27 2-.27.68 0 1.36.09 2 .27 1.53-1.03 2.2-.82 2.2-.82.44 1.11.16 1.93.08 2.13.51.56.82 1.27.82 2.15 0 3.07-1.87 3.75-3.65 3.95.29.25.54.73.54 1.48 0 1.07-.01 1.93-.01 2.2 0 .21.15.46.55.38A8.013 8.013 0 0 0 16 8c0-4.42-3.58-8-8-8z"
                />
              </svg>
              <span>GitHubリポジトリ</span>
            </a>
          </aside>
        </>
      )}
    </div>
  );
}

import { useEffect, useRef, useState } from "react";
import L from "leaflet";
import * as im from "../assets";
import { setupGeolocation } from "../geolocation";
import {
  setupBuildingPolygons,
  setupWaterServerMarkers,
  setupVendingMachineMarkers,
  toggleMarkers,
} from "../markers";

// Image pixel size
const imgWidth = 4000;
const imgHeight = 2800;

export function MapPage() {
  const mapRef = useRef<L.Map | null>(null);
  const containerRef = useRef<HTMLDivElement>(null);
  const wsMarkersRef = useRef<L.Marker[]>([]);
  const vmMarkersRef = useRef<L.Marker[]>([]);
  const [wsMarkersVisible, setWsMarkersVisible] = useState(false);
  const [vmMarkersVisible, setVmMarkersVisible] = useState(false);

  useEffect(() => {
    if (!containerRef.current) return;

    // Create map with CRS.Simple (custom coordinates)
    const map = L.map(containerRef.current, { crs: L.CRS.Simple, minZoom: -2 });

    // Coordinate area for image placement
    const bounds: L.LatLngBoundsExpression = [
      [0, 0],
      [imgHeight, imgWidth],
    ];

    // Image overlay
    L.imageOverlay(im.Komabamap, bounds).addTo(map);
    map.fitBounds(bounds);

    mapRef.current = map;

    // Setup features
    setupGeolocation(map);

    // Setup water server markers
    const wsMarkers = setupWaterServerMarkers(map);
    wsMarkersRef.current = wsMarkers.markers;

    // Setup vending machine markers
    const vmMarkers = setupVendingMachineMarkers(map);
    vmMarkersRef.current = vmMarkers.markers;

    // Setup building polygons
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

  return (
    <div className="w-full h-screen relative">
      <div ref={containerRef} className="w-full h-full" />

      {/* Water Server Button */}
      <button
        onClick={handleWsMarkerToggle}
        className={`wsButton transition-all ${
          wsMarkersVisible ? "bg-blue-600" : "bg-blue-500 hover:bg-blue-600"
        }`}
        title="Toggle water server markers"
      >
        <img src={im.WaterServer} alt="ウォーターサーバーのボタン" />
        ウォーターサーバー
      </button>

      {/* Vending Machine Button */}
      <button
        onClick={handleVmMarkerToggle}
        className={`vmButton transition-all ${
          vmMarkersVisible
            ? "bg-orange-600"
            : "bg-orange-500 hover:bg-orange-600"
        }`}
        title="Toggle vending machine markers"
      >
        <img src={im.VendingMachine} alt="自動販売機のボタン" />
        自動販売機
      </button>
    </div>
  );
}

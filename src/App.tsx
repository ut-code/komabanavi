import { BrowserRouter, Routes, Route } from "react-router-dom";
import "./app.css";
import { MapPage } from "./pages/MapPage";
import { BuildingPage } from "./pages/BuildingPage";
import { UsagePage } from "./pages/UsagePage";

export function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<MapPage />} />
        <Route path="/building/:buildingId" element={<BuildingPage />} />
        <Route path="/usage" element={<UsagePage />} />
      </Routes>
    </BrowserRouter>
  );
}

import { BrowserRouter, Routes, Route } from "react-router-dom";
import "./app.css";
import { MapPage } from "./pages/MapPage";
import { BuildingPage } from "./pages/BuildingPage";

export function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<MapPage />} />
        <Route path="/building/:buildingId" element={<BuildingPage />} />
      </Routes>
    </BrowserRouter>
  );
}

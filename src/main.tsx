import React from "react";
import ReactDOM from "react-dom/client";
import { App } from "./App";
import { ConvexProvider, ConvexReactClient } from "convex/react";

const root = document.getElementById("root");
if (!root) {
  throw new Error("Root element not found");
}

const deploymentURL = import.meta.env.VITE_CONVEX_URL;
const convex = new ConvexReactClient(deploymentURL);

ReactDOM.createRoot(root).render(
  <React.StrictMode>
    <ConvexProvider client={convex}>
      <App />
    </ConvexProvider>
  </React.StrictMode>,
);

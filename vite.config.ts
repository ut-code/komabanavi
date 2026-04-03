import { defineConfig } from "vite";
import tailwindcss from "@tailwindcss/vite";

export default defineConfig({
  plugins: [tailwindcss()],
  server: {
    port: 8080,
  },
  publicDir: "./assets",
  // base: process.env.BASE_PATH ?? "/",
  base: "/",
});

import { defineConfig } from "vite";

export default defineConfig({
  server: {
    port: 8080,
  },
  publicDir: "./assets",
  base: process.env.BASE_PATH ?? "/",
});

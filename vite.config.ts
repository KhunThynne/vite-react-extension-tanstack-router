import { defineConfig } from "vite";
import react from "@vitejs/plugin-react";
import { resolve } from "path";
import tailwindcss from "@tailwindcss/vite";
import tanstackRouter from "@tanstack/router-plugin/vite";
import webExtension from "vite-plugin-web-extension";
// https://vite.dev/config/
export default defineConfig({
  resolve: {
    alias: {
      "@": resolve(__dirname, "src"),
      "@components": resolve(__dirname, "src/shared/components"),
    },
  },
  plugins: [
    tanstackRouter({
      target: "react",
      autoCodeSplitting: true,
      routeFileIgnorePattern: ".*_shared.*",
    }),
    tailwindcss(),
    webExtension({
      manifest: "./manifest.json",
    }),
    react({
      babel: {
        plugins: [["babel-plugin-react-compiler"]],
      },
    }),
  ],
});

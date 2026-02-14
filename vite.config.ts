import { defineConfig } from "vite";
import react from "@vitejs/plugin-react";
import { resolve } from "path";
import tailwindcss from "@tailwindcss/vite";
import tanstackRouter from "@tanstack/router-plugin/vite";
import webExtension from "vite-plugin-web-extension";
import manifest from "./manifest.config";
// https://vite.dev/config/
export default defineConfig({
  resolve: {
    alias: {
      "@": resolve(__dirname, "src"),
      "@components": resolve(__dirname, "src/shared/components"),
      "@libs": resolve(__dirname, "src/shared/libs"),
      "@contexts": resolve(__dirname, "src/shared/contexts"),
      "@hooks": resolve(__dirname, "src/shared/hooks"),
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
      manifest,
    }),
    react({
      babel: {
        plugins: [["babel-plugin-react-compiler"]],
      },
    }),
  ],
});

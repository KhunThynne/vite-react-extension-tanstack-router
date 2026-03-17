import { defineConfig } from "vite";
import { resolve } from "path";
import tailwindcss from "@tailwindcss/vite";
import tanstackRouter from "@tanstack/router-plugin/vite";
import webExtension from "vite-plugin-web-extension";
import manifest from "./manifest.config";
import react, { reactCompilerPreset } from "@vitejs/plugin-react";
import babel from "@rolldown/plugin-babel";

// https://vite.dev/config/
export default defineConfig({
  resolve: {
    alias: {
      "@": resolve(__dirname, "src"),
      "@@": resolve(__dirname, "src/shared"),
    },
  },
  build: {
    emptyOutDir: true,
    cssCodeSplit: false,
    // minify: "terser",
    rollupOptions: {
      output: {
        inlineDynamicImports: true,
        assetFileNames: "assets/[name]-[hash].[ext]",
      },
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
      additionalInputs: ["index.html"],
    }),
    react(),
    babel({
      presets: [reactCompilerPreset()],
    }),
  ],
});

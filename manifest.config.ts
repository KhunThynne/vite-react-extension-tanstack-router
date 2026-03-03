import { readJsonFile } from "vite-plugin-web-extension";

export default function generateManifest(): chrome.runtime.ManifestV3 {
  const pkg = readJsonFile("package.json");
  return {
    manifest_version: 3,
    name: pkg.name,
    version: pkg.version,
    description: pkg.description || "My React Extension",

    background: {
      service_worker: "src/extension-core/background/index.ts",
      type: "module",
    },

    content_scripts: [
      {
        matches: ["<all_urls>"],
        js: ["src/extension-core/content_scripts/index.tsx"],
      },
    ],

    permissions: [
      "storage",
      "sidePanel",
      "activeTab",
      "scripting",
      "unlimitedStorage",
    ],
    host_permissions: ["<all_urls>"],

    content_security_policy: {},
  };
}

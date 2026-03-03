import { useEffect } from "react";

/**
 * useThemeBridge
 *
 * Input: container (HTMLElement) - The mount point inside Shadow DOM.
 * Process:
 *  1. Checks 'helpost_theme' in chrome.storage.local.
 *  2. Listens for changes to 'helpost_theme'.
 *  3. Updates the classList of the Shadow Host (container.getRootNode().host).
 * Output: Side effect - Toggles '.dark' class on the Shadow Host.
 */
export function useThemeBridge(container?: HTMLElement) {
  useEffect(() => {
    if (!container) return;

    // Helper to apply theme to the Shadow Host
    const applyTheme = (theme: "dark" | "light" | "system") => {
      const rootNode = container.getRootNode();
      // Ensure we are in a ShadowRoot before accessing .host
      if (rootNode instanceof ShadowRoot) {
        const host = rootNode.host as HTMLElement;
        if (theme === "dark") {
          host.classList.add("dark");
        } else {
          host.classList.remove("dark");
        }
      }
    };

    // 1. Initial Load
    chrome.storage.local.get(["helpost_theme"], (result) => {
      // Default to dark if undefined, or strictly follow storage
      const currentTheme =
        (result.helpost_theme as "dark" | "light" | "system") || "dark";
      applyTheme(currentTheme);
    });

    // 2. Change Listener
    const handleStorageChange = (
      changes: { [key: string]: chrome.storage.StorageChange },
      areaName: string,
    ) => {
      if (areaName === "local" && changes.helpost_theme) {
        const newValue = changes.helpost_theme.newValue;
        if (
          newValue === "dark" ||
          newValue === "light" ||
          newValue === "system"
        ) {
          applyTheme(newValue);
        }
      }
    };

    chrome.storage.onChanged.addListener(handleStorageChange);

    // Cleanup
    return () => {
      chrome.storage.onChanged.removeListener(handleStorageChange);
    };
  }, [container]);
}

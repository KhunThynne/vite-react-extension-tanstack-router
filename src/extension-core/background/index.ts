import type { ContentScriptActionType } from "@/shared/types/ContentSciptActionType";

chrome.runtime.onInstalled.addListener(() => {
  chrome.sidePanel
    .setPanelBehavior({ openPanelOnActionClick: true })
    .catch((error) => console.error(error));
});

chrome.runtime.onMessage.addListener(
  (message: ContentScriptActionType, _sender, sendResponse) => {
    switch (message.type) {
      case "Boiler":
        sendResponse("Boiler response");
        return true;
      default:
        return false;
    }
  },
);

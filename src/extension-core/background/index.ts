import { chromeService } from "@/shared/services/chrome";
import type { ContentScriptActionType } from "@/shared/types/ContentSciptActionType";

chrome.runtime.onInstalled.addListener(() => {
  chrome.sidePanel
    .setPanelBehavior({ openPanelOnActionClick: true })
    .catch((error) => console.error(error));
});

chromeService.onMessage({
  Boiler: ({ payload, sender }) => {
    return "Boiler response" + payload.id;
  },
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

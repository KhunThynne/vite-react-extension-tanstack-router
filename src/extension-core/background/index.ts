import { chromeService } from "@/shared/services/chrome";
import type { ContentScriptActionType } from "@/shared/types/ContentSciptActionType";

chromeService.runtime.onInstalled.addListener(() => {
  chrome.sidePanel
    .setPanelBehavior({ openPanelOnActionClick: true })
    .catch((error) => console.error(error));
});

chromeService.runtime.onMessage.addListenerService({
  Boiler: ({ payload, sender }) => {
    return "Boiler response" + payload.id;
  },
});
// chromeService.runtime.onMessage.addListenerService(
//   (message: ContentScriptActionType, _sender, sendResponse) => {
//     switch (message.type) {
//       case "Boiler":
//         sendResponse("Boiler response");
//         return true;
//       default:
//         return false;
//     }
//   },
// );

import { chromeService } from "@/shared/services/chrome";

chromeService.runtime.onInstalled.addListener(() => {
  chrome.sidePanel
    .setPanelBehavior({ openPanelOnActionClick: true })
    .catch((error) => console.error(error));
});

chromeService.runtime.onMessage.addListenerService({
  Boiler: ({ payload }) => {
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

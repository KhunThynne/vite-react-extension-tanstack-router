import db, { setupDatabase } from "@/db";
import { chromeService } from "@/shared/services/chrome";
setupDatabase().catch((err) => console.error("Initialization error", err));
chromeService.runtime.onInstalled.addListener(() => {
  chrome.sidePanel
    .setPanelBehavior({ openPanelOnActionClick: true })
    .catch((error) => console.error(error));
});

chromeService.runtime.onMessage.addListenerService({
  Boiler: ({ payload }) => {
    db.user.get(payload.id);
    return "Boiler response" + payload.id;
  },
});

import { sendMessageToTab, sendMessage } from "./sendMessageServices";
import { createMessageListenerService } from "./createMessageListenerService";

export const chromeService = {
  ...chrome,
  tabs: {
    ...chrome.tabs,
    sendMessage: sendMessageToTab,
  },
  runtime: {
    ...chrome.runtime,
    sendMessage: sendMessage,
    onMessage: {
      ...chrome.runtime.onMessage,
      addListenerService: createMessageListenerService,
    },
  },
};

chromeService.runtime.onMessage.addListenerService({
  Boiler: () => {
    return "Boiler response";
  },
});

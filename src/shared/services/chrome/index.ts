import { sendMessageToTab, sendMessage } from "./sendMessageServices";
import { createMessageListenerService } from "./createMessageListenerService";
const isExtension = typeof chrome !== "undefined" && !!chrome.runtime;
export const chromeService = {
  ...(isExtension ? chrome : {}),
  tabs: {
    ...(isExtension ? chrome.tabs : {}),
    sendMessage: sendMessageToTab,
  },
  runtime: {
    ...(isExtension ? chrome.runtime : {}),

    sendMessage: sendMessage,
    onMessage: {
      ...(isExtension ? chrome.runtime.onMessage : {}),
      addListenerService: createMessageListenerService,
    },
  },
};

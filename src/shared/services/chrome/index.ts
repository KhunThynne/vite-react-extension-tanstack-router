import { sendMessageToTab, sendMessage } from "./sendMessageToTab";
import { createMessageListener } from "./createMessageListener";

export const chromeService = {
  sendToTab: sendMessageToTab,
  send: sendMessage,
  onMessage: createMessageListener,
};

import type { ContentScriptActionType } from "@/shared/types/ContentSciptActionType";

type MessageHandler<T extends ContentScriptActionType> = (
  payload: T["payload"],
  sender: chrome.runtime.MessageSender,
) => Promise<T["_response"]> | T["_response"];

export function createMessageListener(handlers: {
  [K in ContentScriptActionType["type"]]?: MessageHandler<
    Extract<ContentScriptActionType, { type: K }>
  >;
}) {
  chrome.runtime.onMessage.addListener(
    (message: ContentScriptActionType, sender, sendResponse) => {
      const handler = handlers[
        message.type
      ] as MessageHandler<ContentScriptActionType>;

      if (handler) {
        Promise.resolve(handler(message.payload, sender))
          .then((response) => sendResponse(response))
          .catch((error) => {
            console.error(`Error in handler ${message.type}:`, error);
          });
        return true;
      }
    },
  );
}

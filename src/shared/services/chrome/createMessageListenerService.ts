import type { ContentScriptActionType } from "@/shared/types/ContentSciptActionType";
/**
 * Represents a specialized handler for a specific message type.
 * This type ensures that the `payload` and `_response` are strictly bound
 * to the Action defined in the `ContentScriptActionType` union.
 * * @template T - A subtype of ContentScriptActionType extracted based on the 'type' key.
 */
type MessageHandler<T extends ContentScriptActionType> = (
  /** * A unified object containing both the data and its metadata.
   */
  args: {
    payload: T["payload"];
    sender: chrome.runtime.MessageSender;
  },
) => Promise<T["_response"]> | T["_response"];

/**
 * Creates a Type-Safe Message Listener for Chrome Extensions.
 * * ### 🏗️ Architecture (Encapsulation)
 * This function acts as a **High-level Wrapper** over the native:
 * ```ts
 * chrome.runtime.onMessage.addListener((message, sender, sendResponse) => { ... });
 * ```
 * It abstracts the "Spaghetti Code" of multiple `if/else` or `switch` statements
 * into a structured **Dispatcher Pattern**. While it looks like a modern service,
 * the runtime behavior remains 100% compliant with the standard Chrome Messaging API.
 * * ### ✨ Key Features:
 * 1. **Context-Aware Inference**: By mapping the handler key to the Action type,
 * the `payload` becomes strictly typed without manual casting (`as Type`).
 * 2. **Auto-Async Orchestration**:
 * - Automatically returns `true` to keep the message channel open.
 * - Automatically bridges the handler's `return` value to `sendResponse`.
 * 3. **Centralized Error Boundary**: Prevents an unhandled exception in one
 * service from breaking the entire listener. Errors are caught and logged gracefully.
 * 4. **Standard Compatibility**: Provides full access to the native `sender`
 * object, ensuring no loss of context.
 * * @example
 * // Define your handlers like a Service
 * createMessageListener({
 * Boiler: async (payload, sender) => {
 * console.log("Checking boiler:", payload.id);
 * return "Heat check passed"; // Response is type-checked!
 * },
 * SyncData: (payload) => {
 * return db.users.add(payload.user);
 * }
 * });
 * * @param handlers - A partial map of all possible Action types to their specific handling functions.
 */

export function createMessageListenerService(handlers: {
  [K in ContentScriptActionType["type"]]?: MessageHandler<
    Extract<ContentScriptActionType, { type: K }>
  >;
}) {
  chrome["runtime"].onMessage.addListener(
    (message: ContentScriptActionType, sender, sendResponse) => {
      const handler = handlers[
        message.type
      ] as MessageHandler<ContentScriptActionType>;
      if (handler) {
        Promise.resolve(handler({ payload: message.payload, sender }))
          .then((response) => sendResponse(response))
          .catch((error) => {
            console.error(`Error in handler ${message.type}:`, error);
            sendResponse({ error: error.message });
          });

        return true;
      }
      return false;
    },
  );
}

import type { ContentScriptActionType } from "@/shared/types/ContentSciptActionType";

export async function sendMessage<T extends ContentScriptActionType>(
  action: Omit<T, "_response">,
): Promise<T["_response"]> {
  return chrome.runtime.sendMessage(action);
}

export async function sendMessageToTab<T extends ContentScriptActionType>(
  tabId: number | undefined,
  action: Omit<T, "_response">,
): Promise<T["_response"]> {
  if (!tabId) {
    throw new Error("Tab ID is required to send a message.");
  } 
  return chrome.tabs.sendMessage(tabId, action);
}

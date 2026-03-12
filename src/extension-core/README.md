# Extension Core Documentation

This directory (`src/extension-core`) contains the core background and content scripts for the Chrome extension. We use a **Type-Safe Messaging System** wrapped around standard Chrome APIs to ensure that all communication between the background script, content scripts, and popups is fully typed and predictable.

## 1. How to Define a New Message Action

Before sending or listening to a message, you must define its types. We keep these centralized in `src/shared/types/ContentSciptActionType.ts`.

1. Open `src/shared/types/ContentSciptActionType.ts`.
2. Define a new action using the `BaseAction<TypeString, PayloadType, ResponseType>` interface.
3. Add the newly created action to the `ContentScriptActionType` union.

### Example:

```typescript
// src/shared/types/ContentSciptActionType.ts
import type { BaseAction } from "@/shared/types/BaseAction";

// 1. Define your new action
// Type: "SyncData"
// Payload: { userId: string, items: string[] }
// Response: boolean (success status)
type SyncDataAction = BaseAction<"SyncData", { userId: string; items: string[] }, boolean>;

// 2. Add it to the main union type
export type ContentScriptActionType = BoilerAction | SyncDataAction;
```

## 2. How to Add a Listener (Background Script)

Instead of using the verbose `chrome.runtime.onMessage.addListener` with spaghetti `if/else` statements, we use our custom dispatcher service: `chromeService.runtime.onMessage.addListenerService`. This utility automatically infers the payload type and ensures that the response type matches the definition.

1. Open `src/extension-core/background/index.ts`.
2. Add your new action inside the `addListenerService` object.

### Example:

```typescript
// src/extension-core/background/index.ts
import { chromeService } from "@/shared/services/chrome";

chromeService.runtime.onMessage.addListenerService({
  // Existing Boiler Action
  Boiler: ({ payload, sender }) => {
    return "Boiler response" + payload.id;
  },
  
  // 1. Add your new SyncData handler
  // Note: 'payload' is automatically typed as { userId: string, items: string[] }
  // You MUST return a boolean (either directly or via Promise), as defined by 'SyncDataAction'.
  SyncData: async ({ payload, sender }) => {
    console.log("Syncing items for:", payload.userId);
    try {
      await someDatabaseSync(payload.userId, payload.items);
      return true; // Strongly typed response
    } catch {
      return false; 
    }
  },
});
```

> [!TIP]
> `addListenerService` automatically wraps asynchronous Promise resolution and catches errors internally, returning `true` under the hood to keep the Chrome message channel open for you.

## 3. How to Send a Message (Trigger the Listener)

To trigger the listener from a React component, popup, side panel, or content script, use the custom `sendMessage` wrapper in `chromeService`.

### From UI / Popup / Side Panel to Background:

```typescript
import { chromeService } from "@/shared/services/chrome";

async function triggerSync() {
  // 1. Omit the '_response' field when sending. 
  // 'sendMessage' will autocomplete the type and strictly enforce its payload.
  const isSuccess = await chromeService.runtime.sendMessage({
    type: "SyncData",
    payload: {
      userId: "123",
      items: ["item1", "item2"]
    }
  });

  // isSuccess is strongly typed as 'boolean' here!
  if (isSuccess) {
    console.log("Successfully synced!");
  }
}
```

### To a Specific Content Script (Tab):

If you need to send a message specific to a single Chrome Tab, use `chromeService.tabs.sendMessage`:

```typescript
import { chromeService } from "@/shared/services/chrome";

async function sendToTab(tabId: number) {
  const result = await chromeService.tabs.sendMessage(tabId, {
    type: "SomeTabAction",
    payload: { /* ... */ }
  });
}
```

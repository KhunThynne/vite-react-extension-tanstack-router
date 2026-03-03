import { createCollection } from "@tanstack/db";
import { getDb, type AppDBSchema } from "../config/idb";
import type { StoreNames } from "idb";

export function createPersistentCollection<T extends { id: string }>(options: {
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  schema: any; // Ideally this is a Zod schema type, passed down
  storeName: StoreNames<AppDBSchema>;
}) {
  return createCollection({
    schema: options.schema,
    getKey: (item) => item.id,
    sync: { sync: () => {} }, // Keep base sync empty or wire to a real backend later
    onInsert: async ({ transaction }) => {
      const newItem = transaction.mutations[0].modified as T;
      const db = await getDb();
      // eslint-disable-next-line @typescript-eslint/no-explicit-any
      await db.put(options.storeName, newItem as any);
      console.log(`[${options.storeName}] Inserted to IndexedDB:`, newItem);
    },
    onUpdate: async ({ transaction }) => {
      const updatedItem = transaction.mutations[0].modified as T;
      const db = await getDb();
      // eslint-disable-next-line @typescript-eslint/no-explicit-any
      await db.put(options.storeName, updatedItem as any);
      console.log(`[${options.storeName}] Updated in IndexedDB:`, updatedItem);
    },
    onDelete: async ({ transaction }) => {
      const keyToDelete = transaction.mutations[0].key;
      const db = await getDb();
      await db.delete(options.storeName, keyToDelete);
      console.log(`[${options.storeName}] Deleted from IndexedDB:`, keyToDelete);
    },
  });
}

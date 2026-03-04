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
    sync: {
      sync: (params) => {
        const { begin, write, commit, markReady, collection } = params;

        const initialSync = async () => {
          try {
            const db = await getDb();
            const data = await db.getAll(options.storeName);
            begin();

            for (const item of data) {
              write({
                type: "insert",
                value: item as unknown as T,
              });
            }

            commit();
          } catch (error) {
            console.error(`[${options.storeName}] Initial sync failed:`, error);
          } finally {
            markReady();
          }
        };

        initialSync();

        return () => {
          console.log(`[${options.storeName}] Cleanup called`);
        };
      },
    },
    onInsert: async ({ transaction }) => {
      await Promise.all(
        transaction.mutations.map(async (mutation) => {
          const newItem = mutation.modified;
          const db = await getDb();
          return await db.put(options.storeName, newItem);
        }),
      );
    },
    onUpdate: async ({ transaction }) => {
      const updatedItem = transaction.mutations[0].modified;
      const db = await getDb();
      await db.put(options.storeName, updatedItem);
    },
    onDelete: async ({ transaction }) => {
      const keyToDelete = transaction.mutations[0].key;
      const db = await getDb();
      await db.delete(options.storeName, keyToDelete);
    },
  });
}

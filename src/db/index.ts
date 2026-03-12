import { createCollection, type Collection } from "@tanstack/react-db";
import { rxdbCollectionOptions } from "@tanstack/rxdb-db-collection";
import _ from "lodash";
import {
  createRxDatabase,
  addRxPlugin,
  removeRxDatabase,
  type RxJsonSchema,
  type RxDatabase,
} from "rxdb/plugins/core";
import { getRxStorageDexie } from "rxdb/plugins/storage-dexie";
import { allSchemas } from "./schemas";
import { wrappedValidateZSchemaStorage } from "rxdb/plugins/validate-z-schema";
import { RxDBMigrationSchemaPlugin } from "rxdb/plugins/migration-schema";
import { replicateRxCollection } from "rxdb/plugins/replication";
import { RxDBAttachmentsPlugin } from "rxdb/plugins/attachments";
// import { wrappedValidateIsMyJsonValidStorage } from "rxdb/plugins/validate-is-my-json-valid";
// --- LAYER 1: INITIALIZATION & PLUGINS ---


// --- LAYER 3: TYPE ORCHESTRATION ---
type SchemaRegistry = typeof allSchemas;
type SchemaKeys = keyof SchemaRegistry;

type ExtractDocType<T> = T extends {
  collectionAdd: {
    schema: RxJsonSchema<infer D>;
  };
}
  ? D
  : never;

export type AppDatabase = {
  [K in SchemaKeys]: Collection<ExtractDocType<SchemaRegistry[K]>, string>;
};

// --- LAYER 2 & 4: ASYNC SETUP WRAPPER ---

// 1. Export rxdb as a let variable to avoid Top-Level Await (TLA) errors in IIFE formats
export let rxdb: RxDatabase | null = null;

// 2. Export db as a constant empty object to be populated later; maintains AppDatabase type
export const db = {} as AppDatabase;

const DB_NAME = _.kebabCase(import.meta.env.VITE_CLIENT_DB_NAME ?? "client-db");
const STORAGE = wrappedValidateZSchemaStorage({
  storage: getRxStorageDexie(),
});
/**
 * setupDatabase: Wraps Layer 2 and 4 logic into a single function.
 * This allows asynchronous initialization at the appropriate entry point.
 */
export async function createDb() {
  // Singleton Check: If already initialized, return existing db immediately
  if (rxdb && Object.keys(db).length > 0) return db;
  addRxPlugin(RxDBAttachmentsPlugin);
  addRxPlugin(RxDBMigrationSchemaPlugin);
  if (!import.meta.env.PROD) {
    await import("rxdb/plugins/dev-mode").then((module) =>
      addRxPlugin(module.RxDBDevModePlugin),
    );
  }

  try {
    // --- LAYER 2: DATABASE INSTANCE ---
    rxdb = await createRxDatabase({
      name: DB_NAME,
      storage: STORAGE,
    });

    // --- LAYER 4: COLLECTION REGISTRATION ---

    // 1. Register Physical Collections to RxDB
    await rxdb.addCollections(
      Object.fromEntries(
        Object.entries(allSchemas).map(([name, config]) => [
          name,
          {
            ...config.collectionAdd,
          },
        ]),
      ) as never,
    );
    // 2. Create Reactive TanStack Layer
    (Object.keys(allSchemas) as SchemaKeys[]).forEach((name) => {
      const config = allSchemas[name];
      const rxCol = rxdb![name];
      const version = config.collectionAdd.schema.version;
      if (!rxCol) return;
      const options = config.collectionOptions ?? { startSync: true };
      if ("replicateRxCollection" in config && config.replicateRxCollection) {
        replicateRxCollection({
          collection: rxCol,
          ...config.replicateRxCollection,
          replicationIdentifier: `${version}-sync-${name}`,
        });
      }
      // Populate the exported db object with TanStack collections
      db[name] = createCollection(
        rxdbCollectionOptions({
          rxCollection: rxCol,
          ...options,
        } as never),
      ) as never;
    });

    console.log("✅ Database and TanStack Layer initialized");
    return db;
  } catch (error) {
    // Fallback: If schema mismatch occurs, wipe DB and reload (Self-healing)
    console.error("❌ DB Setup failed:", error);
    try {
      await removeRxDatabase(DB_NAME, STORAGE);
      // if (typeof window !== "undefined") window.location.reload();
    } catch (wipeError) {
      console.error("💀 Fatal wipe error:", wipeError);
    }
    throw error;
  }
}

// --- REMAINING TYPES ---
export type Models = {
  [K in keyof SchemaRegistry]: ExtractDocType<SchemaRegistry[K]>;
};
export type DBModel<K extends keyof Models> = Models[K];
export default db;
export type DBType = typeof db;

// import { accountCollection } from "./schemas/account.schema";
// import { userCollection } from "./schemas/user.schema";

import {
  createRxDatabase,
  addRxPlugin,
} from "rxdb/plugins/core";

/**
 * Here we use the localStorage based storage for RxDB.
 * RxDB has a wide range of storages based on Dexie.js, IndexedDB, SQLite, and more.
 */

// add json-schema validation (optional)
import { wrappedValidateAjvStorage } from "rxdb/plugins/validate-ajv";
import { rxdbCollectionOptions } from "@tanstack/rxdb-db-collection";
// Enable dev mode (optional, recommended during development)
import { RxDBDevModePlugin } from "rxdb/plugins/dev-mode";
import { getRxStorageDexie } from "rxdb/plugins/storage-dexie";

addRxPlugin(RxDBDevModePlugin);
import _ from "lodash";
import { createCollection } from "@tanstack/react-db";
import { allSchemas } from "./schemas";

const RdxDB = await createRxDatabase({
  name: _.kebabCase(import.meta.env.VITE_CLIENT_DB_NAME ?? "client-db"),
  storage: wrappedValidateAjvStorage({
    storage: getRxStorageDexie(),
  }),
});
type SchemaKeys = keyof typeof allSchemas;


type AppDatabase = {
  [K in SchemaKeys]: unknown;
};
await RdxDB.addCollections(
  Object.fromEntries(
    Object.entries(allSchemas).map(([name, schema]) => [name, { schema }]),
  ),
);

const db = {} as AppDatabase;
(Object.keys(allSchemas) as SchemaKeys[]).forEach((name) => {
  db[name] = createCollection(
    rxdbCollectionOptions({
      rxCollection: RdxDB[name],
      startSync: true,
    }),
  );
});



export default db as {
  [K in keyof typeof allSchemas]: ReturnType<typeof createCollection>;
};
export type DBType = typeof db;

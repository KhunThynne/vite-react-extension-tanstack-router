import { openDB } from "idb";
import type { DBSchema, IDBPDatabase } from "idb";
import type { UserDBType } from "../schemas/user.schema";
import type { AccountDBType } from "../schemas/account.schema";

const DB_NAME = import.meta.env.VITE_CLIENT_DB_NAME;
const DB_VERSION = import.meta.env.VITE_CLIENT_DB_VERSION;

export interface AppDBSchema extends DBSchema {
  users: {
    key: string;
    value: UserDBType;
  };
  test: {
    key: string;
    value: any;
  };
  accounts: {
    key: string;
    value: AccountDBType;
  };
}

let dbPromise: Promise<IDBPDatabase<AppDBSchema>> | null = null;

export function getDb(): Promise<IDBPDatabase<AppDBSchema>> {
  if (!dbPromise) {
    dbPromise = openDB<AppDBSchema>(DB_NAME, DB_VERSION, {
      upgrade(db) {
        if (!db.objectStoreNames.contains("users")) {
          db.createObjectStore("users", { keyPath: "id" });
        }
        if (!db.objectStoreNames.contains("test")) {
          db.createObjectStore("test", { keyPath: "id" });
        }
        if (!db.objectStoreNames.contains("accounts")) {
          db.createObjectStore("accounts", { keyPath: "id" });
        }
      },
    });
  }
  return dbPromise;
}

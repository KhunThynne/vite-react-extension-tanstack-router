import type { RxDBCollectionConfig } from "@tanstack/rxdb-db-collection";
import type { RxJsonSchema } from "rxdb";

/**
 * LAYER 1: DATA MODEL DEFINITION
 * Defines the TypeScript interface for the document stored in the database.
 * This acts as the "Source of Truth" for type safety across the application.
 */
type UserDBType = {
  id: string;
  name: string;
  email: string;
  createdAt: number;
};

/**
 * LAYER 2: PHYSICAL STORAGE SCHEMA (RxDB)
 * Defines the NoSQL database structure, primary keys, and constraints.
 * This is used by RxDB to create the actual IndexedDB/Dexie tables.
 */
const schema: RxJsonSchema<UserDBType> = {
  title: "human schema",
  description: "describes a human being",
  version: 0,
  keyCompression: false,
  primaryKey: "id",
  type: "object",
  properties: {
    id: {
      type: "string",
      maxLength: 40,
    },
    name: {
      type: "string",
    },
    email: {
      type: "string",
    },
    createdAt: {
      type: "number",
    },
  },
  required: ["id", "name", "email", "createdAt"],
} as const;

/**
 * LAYER 3: REACTIVE STATE OPTIONS (TanStack DB)
 * Defines how this collection behaves within the TanStack ecosystem.
 * We omit 'rxCollection' here because it will be injected during the
 * database initialization phase in the main DB entry point.
 */
const collectionOptions: Omit<
  RxDBCollectionConfig<UserDBType, never>,
  "rxCollection"
> = {
  startSync: true, // Automatically observe changes and sync with React state
};

// Exporting the schema and options as a cohesive unit for dynamic registration
export { schema, collectionOptions };
export type { UserDBType };

import type { RxJsonSchema } from "rxdb";
import type { CollectionDefinition } from ".";

/**
 * LAYER 1: DATA MODEL DEFINITION
 * Defines the TypeScript interface for the document stored in the database.
 * This acts as the "Source of Truth" for type safety across the application.
 */
type UserDBType = {
  id: string;
  name: string;
  email: string;
  test: string;
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
  version: 1,
  keyCompression: false,
  primaryKey: "id",
  type: "object",
  properties: {
    id: {
      type: "string",
      maxLength: 40,
    },
    test: {
      type: "string",
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

// Exporting the schema and options as a cohesive unit for dynamic registration
const config = {
  collectionAdd: {
    schema: schema,
    migrationStrategies: {
      1: (oldDocumentData) => {
        return {
          ...oldDocumentData,
          test: "test",
        };
      },
    },
  },
  replicateRxCollection: { live: true },
  collectionOptions: {
    startSync: true,
  },
} satisfies CollectionDefinition<UserDBType>;

export const { collectionAdd, collectionOptions } = config;
export type { UserDBType };

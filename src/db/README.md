# Database Schema Setup Guide

This directory (`src/db`) contains the local database setup, powered by **RxDB** for robust physical storage (Dexie/IndexedDB) and **@tanstack/react-db** for seamless reactivity in React.

## 1. How to Create a New Schema

To define a new database table/collection, you must create a new file in the `src/db/schemas/` directory (e.g., `src/db/schemas/myFeature.schema.ts`).

The structure of a schema file consists of three main layers:

1. **Layer 1: Data Model (TypeScript)**: The source-of-truth interface for the record.
2. **Layer 2: Physical Storage Schema**: The RxDB JSON schema that defines the NoSQL structure (primary key, constraints).
3. **Layer 3: Reactive State Options**: TanStack React DB config that drives caching, replication, and migration logic.

### Example Template (`myFeature.schema.ts`)

```typescript
import type { RxJsonSchema } from "rxdb";
import type { CollectionDefinition } from ".";

/**
 * LAYER 1: DATA MODEL DEFINITION
 * Defines the TypeScript interface for your document.
 */
type MyFeatureDBType = {
  id: string;
  name: string;
  createdAt: number;
};

/**
 * LAYER 2: PHYSICAL STORAGE SCHEMA (RxDB)
 * Defines the NoSQL database structure, primary keys, and constraints.
 */
const schema: RxJsonSchema<MyFeatureDBType> = {
  title: "my feature schema",
  version: 1, // ⚠️ Must increment this whenever schema structure changes
  keyCompression: false,
  primaryKey: "id",
  type: "object",
  properties: {
    id: { type: "string", maxLength: 40 },
    name: { type: "string" },
    createdAt: { type: "number" },
  },
  required: ["id", "name", "createdAt"], 
} as const;

/**
 * LAYER 3: REACTIVE STATE OPTIONS (TanStack DB)
 * Defines TanStack integration, migrations, and RxDB replication options.
 */
const config = {
  collectionAdd: {
    schema,
    // Provide migration logic here if you increase the version!
    migrationStrategies: {}, 
  },
  // Optional: Add replication configuration if synchronizing over the network
  // replicateRxCollection: { live: true },
  collectionOptions: {
    startSync: true,
  },
} satisfies CollectionDefinition<MyFeatureDBType>;

// Export as cohesive unit
export const { collectionAdd, collectionOptions } = config;
export type { MyFeatureDBType };
```

## 2. How to Register the Schema

Once you've created your file, you must expose it to the database initialization logic. We centralize this in `src/db/schemas/index.ts`.

1. Open `src/db/schemas/index.ts`.
2. Import your new schema and append it to the `allSchemas` registry.

```typescript
// 1. Import your new schema
import * as myFeature from "./myFeature.schema";

// 2. Add it to the main registry
export const allSchemas = {
  user: { ...user },
  account: { ...account },
  myFeature: { ...myFeature }, // <-- Add your new schema here
} satisfies Record<string, CollectionDefinition>;
```

## How It Works Under The Hood

By adding your schema to `allSchemas`, `src/db/index.ts` will automatically:
1. Parse your schema constraints and initialize the underlying NoSQL instances (Dexie).
2. Auto-magically infer Typescript typings globally.
3. Automatically execute any migration strategies you defined if a user upgrades to a newer verion of the schema.
4. Bind TanStack collections tracking its real-time state, making data instantly queryable via hooks in your UI components!

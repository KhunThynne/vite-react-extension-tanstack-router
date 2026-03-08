// import { z } from "zod";
// import { createPersistentCollection } from "../utils/factory";

// const accountSchema = z.object({
//   id: z.string(),
//   userId: z.string(),
//   provider: z.string(),
//   lastLogin: z.string(), // ISO date string preferred here
// });

// type AccountDBType = z.infer<typeof accountSchema>;

// const accountCollection = createPersistentCollection<AccountDBType>({
//   schema: accountSchema,
//   storeName: "accounts",
// });

// export { accountCollection, accountSchema };
// export type { AccountDBType };

import type { RxDBCollectionConfig } from "@tanstack/rxdb-db-collection";
import type { RxJsonSchema } from "rxdb";
import z from "zod";

const accountSchemaZod = z.object({
  id: z.string(),
  userId: z.string(),
  provider: z.string(),
  lastLogin: z.string(), // ISO date string preferred here
});
type AccountDBType = z.infer<typeof accountSchemaZod>;
const schema: RxJsonSchema<AccountDBType> = {
  title: "account schema",
  description: "describes a account",
  version: 0,
  keyCompression: false,
  primaryKey: "id",
  type: "object",
  properties: {
    id: {
      type: "string",
      maxLength: 40,
    },
    userId: {
      type: "string",
      ref: "user",
    },
    provider: {
      type: "string",
    },
    lastLogin: {
      type: "string",
    },
  },
  required: ["id", "userId", "provider", "lastLogin"],
} as const;
const collectionOptions: Omit<
  RxDBCollectionConfig<AccountDBType, never>,
  "rxCollection"
> = {
  startSync: true, // Automatically observe changes and sync with React state
};
export { schema, collectionOptions };
export type { AccountDBType };

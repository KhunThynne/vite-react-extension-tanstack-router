import { type RxCollectionCreator } from "rxdb";
import { type RxDBCollectionConfig } from "@tanstack/rxdb-db-collection";
import * as user from "./user.schema";
import * as account from "./account.schema";

/**
 * LAYER 4: SCHEMA ORCHESTRATION TYPE
 * This type ensures that every entry in allSchemas either:
 * 1. Contains both 'schema' and 'collectionOptions' (Full Config)
 * 2. Or is just a raw 'RxJsonSchema' (Basic Config)
 */
type CollectionDefinition<T extends object = any> = {
  collectionCreator: RxCollectionCreator<T>;
  collectionOption?: Omit<RxDBCollectionConfig<T, never>, "rxCollection">;
};

export const allSchemas = {
  user,
  account,
} satisfies Record<string, CollectionDefinition>;

export type SchemaRegistry = typeof allSchemas;

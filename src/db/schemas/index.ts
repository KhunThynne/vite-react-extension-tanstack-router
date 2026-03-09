import { type ReplicationOptions, type RxCollectionCreator } from "rxdb";
import { type RxDBCollectionConfig } from "@tanstack/rxdb-db-collection";
import * as user from "./user.schema";
import * as account from "./account.schema";

/**
 * LAYER 1: SCHEMA ORCHESTRATION TYPE
 * This type ensures that every entry in allSchemas either:
 * 1. Contains both 'schema' and 'collectionOptions' (Full Config)
 * 2. Or is just a raw 'RxJsonSchema' (Basic Config)
 */
export type CollectionDefinition<SchemaT extends object = never> = {
  collectionAdd: RxCollectionCreator<SchemaT>;
  collectionOptions?: Omit<
    RxDBCollectionConfig<SchemaT, never>,
    "rxCollection"
  >;
  replicateRxCollection?: Omit<
    ReplicationOptions<SchemaT, never>,
    "collection" | "replicationIdentifier"
  >;
};

export const allSchemas = {
  user: { ...user },
  account: { ...account },
} satisfies Record<string, CollectionDefinition>;

export type SchemaRegistry = typeof allSchemas;

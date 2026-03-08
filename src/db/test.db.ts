import { createCollection, type Collection } from "@tanstack/react-db";
import { rxdbCollectionOptions } from "@tanstack/rxdb-db-collection";
import _ from "lodash";
import { createRxDatabase, type RxJsonSchema } from "rxdb";
import { getRxStorageDexie } from "rxdb/plugins/storage-dexie";
import { wrappedValidateAjvStorage } from "rxdb/plugins/validate-ajv";

type TestDBType = {
  id: string;
  name: string;
  email: string;
  createdAt: number;
};

const testSchema: RxJsonSchema<TestDBType> = {
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

export const RdxDB = await createRxDatabase({
  name: _.kebabCase("client-db"),
  storage: wrappedValidateAjvStorage({
    storage: getRxStorageDexie(),
  }),
});
await RdxDB.addCollections({
  test: {
    schema: testSchema,
  },
});
export type TestCollection = Collection<TestDBType, TestDBType['id']>;
const testCollention: TestCollection = createCollection(
  rxdbCollectionOptions({
    rxCollection: RdxDB["test"],
    startSync: true,
  }),
);
export { testSchema, testCollention };
export type { TestDBType };

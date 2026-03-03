export * from "./config/idb";

import { accountCollection } from "./schemas/account.schema";
import { userCollection } from "./schemas/user.schema";
export * from "./utils/factory";
export * from "./schemas/user.schema";
export * from "./schemas/account.schema";
export * from "./utils/bootstrap";
const db = {
  user: userCollection,
  account: accountCollection,
};

export type AppDB = typeof db;
export default db;

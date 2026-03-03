import { getDb } from "../config/idb";
import { userCollection } from "../schemas/user.schema";
import { accountCollection } from "../schemas/account.schema";

/**
 * Mock API fetcher just for demonstration
 */
async function fetchRemoteData() {
  // e.g., return await fetch('/api/sync').then(res => res.json());
  return { users: [], accounts: [] };
}

export async function bootstrapDB() {
  const db = await getDb();

  // 1. Fetch remote updates (if network is available)
  try {
    const remoteData = await fetchRemoteData();
    // In a real app, you would process incoming network data here,
    // persisting into IDB or inserting into TanStack DB.
    console.log("Fetched remote data:", remoteData);
  } catch (error) {
    console.warn("Failed to fetch remote data, falling back to local only", error);
  }

  // 2. Load initialized cache from IDB
  const allUsers = await db.getAll("users");
  const allAccounts = await db.getAll("accounts");

  // 3. Populate TanStack DB collections (in-memory maps)
  if (allUsers.length > 0) {
    userCollection.insert(allUsers);
    console.log(`Bootstrapped ${allUsers.length} users into TanStack DB.`);
  }

  if (allAccounts.length > 0) {
    accountCollection.insert(allAccounts);
    console.log(`Bootstrapped ${allAccounts.length} accounts into TanStack DB.`);
  }
}

import { z } from "zod";
import { createPersistentCollection } from "../utils/factory";

const accountSchema = z.object({
  id: z.string(),
  userId: z.string(),
  provider: z.string(),
  lastLogin: z.string(), // ISO date string preferred here
});

type AccountDBType = z.infer<typeof accountSchema>;

const accountCollection = createPersistentCollection<AccountDBType>({
  schema: accountSchema,
  storeName: "accounts",
});

export { accountCollection, accountSchema };
export type { AccountDBType };

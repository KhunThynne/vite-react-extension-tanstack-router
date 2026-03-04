// Removed unused createCollection import
import { z } from "zod";
const userSchema = z.object({
  id: z.string(),
  name: z.string(),
  email: z.email(),
  createdAt: z.number(),
});
type UserDBType = z.infer<typeof userSchema>;
import { createPersistentCollection } from "../utils/factory";
const userCollection = createPersistentCollection<UserDBType>({
  schema: userSchema,
  storeName: "users",
});


export { userCollection, userSchema };
export type { UserDBType };

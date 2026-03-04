import type { RxJsonSchema } from "rxdb";
type UserDBType = {
  id: string;
  name: string;
  email: string;
  createdAt: number;
};

const userSchema: RxJsonSchema<UserDBType> = {
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
export { userSchema };
export type { UserDBType };

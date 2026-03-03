import { createCollection } from "@tanstack/db";
import { z } from "zod";
const userSchema = z.object({
  id: z.string(),
  name: z.string(),
  email: z.email(),
  createdAt: z.number(),
});
type UserDBType = z.infer<typeof userSchema>;
const userCollection = createCollection({
  schema: userSchema,
  getKey: (todo) => todo.id,
  sync: { sync: () => {} },
  onInsert: async ({ transaction }) => {
    const newTodo = transaction.mutations[0].modified;
    const currentData = JSON.parse(localStorage.getItem("local_todos") || "[]");
    localStorage.setItem(
      "local_todos",
      JSON.stringify([...currentData, newTodo]),
    );
    console.log("Saved to LocalStorage:", newTodo);
  },

  onUpdate: async ({ transaction }) => {
    const updatedTodo = transaction.mutations[0].modified;
    const currentData = JSON.parse(localStorage.getItem("local_todos") || "[]");

    const newData = currentData.map((t: UserDBType) =>
      t.id === updatedTodo.id ? updatedTodo : t,
    );
    localStorage.setItem("local_todos", JSON.stringify(newData));
  },

  onDelete: async ({ transaction }) => {
    const idToDelete = transaction.mutations[0].key;
    const currentData = JSON.parse(localStorage.getItem("local_todos") || "[]");

    const newData = currentData.filter((t: UserDBType) => t.id !== idToDelete);
    localStorage.setItem("local_todos", JSON.stringify(newData));
  },
});

export { userCollection, userSchema };
export type { UserDBType };

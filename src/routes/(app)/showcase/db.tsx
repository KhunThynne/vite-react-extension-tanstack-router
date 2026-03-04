import { createFileRoute } from "@tanstack/react-router";
import { useLiveSuspenseQuery } from "@tanstack/react-db";
import { Button } from "@/shared/components/ui/button";
import db from "@/db";

import pendingComponent from "@/shared/components/PendingComponent";
import { Fragment } from "react/jsx-runtime";
import type { UserDBType } from "@/db/schemas/user.schema";

export const Route = createFileRoute("/(app)/showcase/db")({
  component: RouteComponent,
  pendingComponent,
  loader: async () => {
    await db.user.preload();
    return null;
  },
});

function RouteComponent() {
  const { data } = useLiveSuspenseQuery((q) => q.from({ user: db.user }), []);

  const users = data as UserDBType[];
  const handleInsert = () => {
    db.user.insert({
      id: crypto.randomUUID(),
      name: "John",
      email: "[EMAIL_ADDRESS]",
      createdAt: Date.now(),
    });
    // userCollection.insert({
    //   id: crypto.randomUUID(),
    //   name: "John",
    //   email: "[EMAIL_ADDRESS]",
    //   createdAt: Date.now(),
    // });
  };
  const handleDelete = (id: string) => {
    db.user.delete([id]);
  };

  return (
    <div key={users.length}>
      <p>Total users: {users.length}</p>
      <Button onClick={handleInsert}>Inert </Button>
      {users.map((user) => (
        <Fragment key={user.id}>
          <div key={user.id}>{user.name}</div>{" "}
          <Button
            onClick={() => {
              handleDelete(user.id);
            }}
          >
            Delete{" "}
          </Button>
        </Fragment>
      ))}
    </div>
  );
}

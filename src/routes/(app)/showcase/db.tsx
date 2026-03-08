import { createFileRoute } from "@tanstack/react-router";
import { useLiveSuspenseQuery } from "@tanstack/react-db";
import { Button } from "@/shared/components/ui/button";
import db, { type DBModel } from "@/db";

import pendingComponent from "@/shared/components/PendingComponent";
import { Fragment } from "react/jsx-runtime";

export const Route = createFileRoute("/(app)/showcase/db")({
  component: RouteComponent,
  pendingComponent,
});

function RouteComponent() {
  const { data } = useLiveSuspenseQuery((q) => q.from({ user: db.user }), []);

  const users = data as DBModel<"user">[];
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
  const handleUpdate = (id: string) => {
    db.user.update(id, (draf) => {
      draf.email = "test@XX.cc";
    });
  };

  return (
    <div key={users.length}>
      <p>Total users: {users.length}</p>
      <Button onClick={handleInsert}>Inert </Button>
      {users.map((user) => (
        <Fragment key={user.id}>
          <div>{user.name}</div>
          <div>{user.email}</div>
          <Button
            onClick={() => {
              handleDelete(user.id);
            }}
          >
            Delete{" "}
          </Button>

          <Button
            onClick={() => {
              handleUpdate(user.id);
            }}
          >
            Update
          </Button>
        </Fragment>
      ))}
    </div>
  );
}

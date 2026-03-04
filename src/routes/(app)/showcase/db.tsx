import { createFileRoute } from "@tanstack/react-router";
import { useLiveQuery, useLiveSuspenseQuery } from "@tanstack/react-db";
import { useQueryClient } from "@tanstack/react-query";
import { Button } from "@/shared/components/ui/button";
import db, { type UserDBType } from "@/db";

import pendingComponent from "@/shared/components/PendingComponent";
import { Fragment } from "react/jsx-runtime";

export const Route = createFileRoute("/(app)/showcase/db")({
  component: RouteComponent,
  pendingComponent,
  loader: async () => {
    await db.user.preload();
    return null;
  },
});

function RouteComponent() {
  const { data, isLoading, status } = useLiveQuery(
    (q) => q.from({ user: db.user }),
    [],
  );

  const queryClient = useQueryClient();
  const users = data as UserDBType[];
  const handleInsert = () => {
    db.user.insert({
      id: crypto.randomUUID(),
      name: "John",
      email: "TEst@test.com",
      createdAt: Date.now(),
    });
  };
  const handleDelete = (id: UserDBType["id"]) => {
    db.user.delete([id]);
  };
  if (isLoading) return <div>Loading...</div>;
  if (status === "error") return <div>Error loading users</div>;

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

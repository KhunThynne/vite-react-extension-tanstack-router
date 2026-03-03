import { createFileRoute } from "@tanstack/react-router";
import { useLiveQuery } from "@tanstack/react-db";
import { Button } from "@/shared/components/ui/button";
import db from "@/db";
export const Route = createFileRoute("/(app)/showcase/db")({
  component: RouteComponent,
});

function RouteComponent() {
  const { data } = useLiveQuery((q) => q.from({ user: db.user }));

  const handleInsert = () => {
    db.user.insert({
      id: crypto.randomUUID(),
      name: "John",
      email: "TEst@test.com",
      createdAt: Date.now(),
    });
  };
  return (
    <div>
      Hello "/(app)/showcase/db"!
      <Button onClick={handleInsert}>Inert </Button>
      <div>{JSON.stringify(data)}</div>
    </div>
  );
}

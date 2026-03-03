import { createFileRoute } from "@tanstack/react-router";
import { eq, useLiveQuery } from "@tanstack/react-db";
import { userCollection } from "@/db";
import { Button } from "@/shared/components/ui/button";
export const Route = createFileRoute("/(app)/showcase/db")({
  component: RouteComponent,
});

function RouteComponent() {
  const { data } = useLiveQuery((q) => q.from({ user: userCollection }));
  const handleInsert = () => {
    userCollection.insert({
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
    </div>
  );
}

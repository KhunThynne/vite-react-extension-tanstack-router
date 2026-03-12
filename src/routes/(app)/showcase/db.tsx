import { createFileRoute } from "@tanstack/react-router";
import { useLiveSuspenseQuery } from "@tanstack/react-db";
import { Button } from "@/shared/components/ui/button";
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/shared/components/ui/card";
import { Avatar, AvatarFallback } from "@/shared/components/ui/avatar";
import db, { type DBModel } from "@/db";

import pendingComponent from "@/shared/components/PendingComponent";

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
      name: "John Does",
      email: "john.doe@example.com",
      createdAt: Date.now(),
      test: "",
    });
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
    <div className="container mx-auto py-6 space-y-6">
      <div className="flex items-center justify-between">
        <h1 className="text-2xl font-bold tracking-tight">Database Showcase</h1>
        <div className="flex items-center gap-4">
          <p className="text-sm font-medium text-muted-foreground bg-muted px-3 py-1 rounded-full">
            Total users: {users.length}
          </p>
          <Button onClick={handleInsert}>Add New User</Button>
        </div>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
        {users.map((user) => (
          <Card key={user.id} className="flex flex-col">
            <CardHeader className="flex flex-row items-center gap-4 space-y-0">
              <Avatar className="h-10 w-10 shrink-0">
                <AvatarFallback className="bg-primary/10 text-primary uppercase">
                  {user.name ? user.name.substring(0, 2) : "??"}
                </AvatarFallback>
              </Avatar>
              <div className="flex flex-col min-w-0">
                <CardTitle className="text-base truncate">{user.name}</CardTitle>
                <CardDescription className="truncate">{user.email}</CardDescription>
              </div>
            </CardHeader>
            <CardContent className="text-sm text-muted-foreground pb-2">
              <span className="font-medium text-foreground">ID: </span>
              <span className="font-mono text-xs">{user.id.substring(0, 8)}...</span>
            </CardContent>
            <CardFooter className="flex justify-end gap-2 mt-auto pt-4">
              <Button
                variant="outline"
                size="sm"
                onClick={() => handleUpdate(user.id)}
              >
                Update
              </Button>
              <Button
                variant="destructive"
                size="sm"
                onClick={() => handleDelete(user.id)}
              >
                Delete
              </Button>
            </CardFooter>
          </Card>
        ))}
        {users.length === 0 && (
          <p className="text-muted-foreground text-sm col-span-full text-center py-10">
            No users found. Click 'Add New User' to insert one.
          </p>
        )}
      </div>
    </div>
  );
}


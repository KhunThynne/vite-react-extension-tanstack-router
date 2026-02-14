import { createFileRoute } from "@tanstack/react-router";
import { AppMain } from "@components/AppMain";

export const Route = createFileRoute("/")({
  component: () => (
    <div className="h-screen">
      <AppMain />
    </div>
  ),
});

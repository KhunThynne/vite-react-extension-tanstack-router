import { createFileRoute } from "@tanstack/react-router";
import { AppMain } from "@/shared/components/AppMain";
import PendingComponent from "@/shared/components/PendingComponent";

export const Route = createFileRoute("/(app)/showcase/")({
  component: AppMain,
  pendingComponent: PendingComponent,
});

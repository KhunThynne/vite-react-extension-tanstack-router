import { createFileRoute } from "@tanstack/react-router";
import { AppMain } from "@/shared/components/AppMain";

export const Route = createFileRoute("/(app)/showcase/")({
  component: AppMain,
});

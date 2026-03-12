import { createRootRoute, Outlet } from "@tanstack/react-router";
import React from "react";
import notFoundComponent from "@/shared/components/NotFoundComponent";
import PendingComponent from "@/shared/components/PendingComponent";
import { createDb } from "@/db";

const TanStackRouterDevtools = import.meta.env.PROD
  ? () => null
  : React.lazy(() =>
      import("@tanstack/react-router-devtools").then((res) => ({
        default: res.TanStackRouterDevtools,
      })),
    );

export const Route = createRootRoute({
  beforeLoad: async () => {
    await createDb();
  },
  component: () => (
    <React.Fragment>
      <Outlet />
      <TanStackRouterDevtools />
    </React.Fragment>
  ),
  pendingComponent: PendingComponent,
  notFoundComponent,
});

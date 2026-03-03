import { createRootRoute, Outlet } from "@tanstack/react-router";
import React, { Fragment } from "react";
import notFoundComponent from "@/shared/components/NotFoundComponent";

const TanStackRouterDevtools = import.meta.env.PROD
  ? () => null
  : React.lazy(() =>
      import("@tanstack/react-router-devtools").then((res) => ({
        default: res.TanStackRouterDevtools,
      })),
    );

export const Route = createRootRoute({
  component: () => (
    <Fragment>
      <Outlet />
      <TanStackRouterDevtools />
    </Fragment>
  ),
  loader: () => {
    return <>Loading</>;
  },
  notFoundComponent,
});

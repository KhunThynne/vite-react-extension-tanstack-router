import { AppHeader } from "@/shared/components/AppHeader";
import { AppSidebar } from "@@/components/AppSidebar";
import { createFileRoute, Outlet } from "@tanstack/react-router";
import clsx from "clsx";

export const Route = createFileRoute("/(app)")({
  component: AppLayout,
});

function AppLayout() {
  return (
    <div className="flex min-h-screen w-full">
      <AppSidebar className=" " />
      <div
        className={clsx(
          "flex flex-col transition-all duration-300 ease-in-out grow  ",
        )}
      >
        <AppHeader className="sticky top-0" />
        <main className="flex-1 p-4 lg:p-6 ">
          <Outlet />
        </main>
      </div>
    </div>
  );
}

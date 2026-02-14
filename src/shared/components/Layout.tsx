import clsx from "clsx";
import { useSidebarContext } from "../contexts/ProviderSidebar";
import { AppHeader } from "./AppHeader";
import { AppSidebar } from "./AppSidebar";

export function Layout({ children }: { children: React.ReactNode }) {
  const { open } = useSidebarContext();
  return (
    <div className="flex min-h-screen w-full bg-muted/40">
      <AppSidebar />
      <div
        className={clsx(
          "flex flex-col transition-all duration-300 ease-in-out w-full",
          open ? "lg:pl-64" : "lg:pl-0",
        )}
      >
        <AppHeader />
        <main className="flex-1 p-4 lg:p-6">{children}</main>
      </div>
    </div>
  );
}

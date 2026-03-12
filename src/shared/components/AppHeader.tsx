import { Bell, Menu } from "lucide-react";
import { Button } from "@/shared/components/ui/button";
import { useSidebarContext } from "../contexts/ProviderSidebar";
import clsx from "clsx";
import { useLocation } from "@tanstack/react-router";
import config from "../config";
import { useTranslation } from "react-i18next";

export function AppHeader({ className }: { className?: string }) {
  const { open, setOpen } = useSidebarContext();
  const { t } = useTranslation();
  const location = useLocation();
  const navigation = config.navigation(t);
  return (
    <header
      className={clsx(
        "flex h-15 items-center gap-4 border-b bg-sidebar px-6 z-20",
        className,
      )}
    >
      <div className="w-full flex-1">
        <h1 className="text-lg font-semibold">
          {navigation.find((item) => item.to === location.pathname)?.label}
        </h1>
      </div>
      <Button variant="ghost" size="icon" className="h-8 w-8 rounded-full">
        <Bell className="size-5" />
        <span className="sr-only">Toggle notifications</span>
      </Button>
      <Button
        variant="ghost"
        size="icon"
        className={clsx(
          "size-8 rounded-full lg:hidden cursor-pointer",
          open && "bg-muted",
        )}
        onClick={() => setOpen(!open)}
      >
        <Menu className="size-5" />
        <span className="sr-only">Toggle menu</span>
      </Button>
    </header>
  );
}

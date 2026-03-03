import { useTranslation } from "react-i18next";
import { Home, LayoutDashboard, FileText, Component, Database } from "lucide-react";

import { cn } from "@/shared/components/ui/utils";
import {
  Avatar,
  AvatarFallback,
  AvatarImage,
} from "@/shared/components/ui/avatar";
import clsx from "clsx";
import { useSidebarContext } from "@/shared/contexts/ProviderSidebar";
import { SwitchThemeButton } from "@/shared/components/SwitchThemeButton";
import { SwitchLanguageButton } from "@/shared/components/SwitchLanguageButton";
import { Link, useLocation } from "@tanstack/react-router";

export function AppSidebar() {
  const { t } = useTranslation();
  const { open } = useSidebarContext();
  const navItems = [
    { icon: LayoutDashboard, label: t("Sidebar.dashboard"), to: "/showcase" },
    { icon: FileText, label: "Forms Showcase", to: "/showcase/forms" },
    { icon: Component, label: "UI Showcase", to: "/showcase/ui" },
    { icon: Database, label: "DB Showcase", to: "/showcase/db" },
  ];

  const location = useLocation();
  return (
    <aside
      className={clsx(
        ` border-r bg-muted/40 lg:block sticky top-0  z-20 transition-all duration-300 ease-in-out lg:w-sm max-h-screen overflow-hidden`,
        open ? "max-lg:max-w-lg" : "max-lg:max-w-0",
      )}
    >
      <div className="flex h-full  max-lg:w-xs flex-col border-r bg-card ">
        <div className="flex h-14 items-center border-b px-4 lg:h-[60px] lg:px-6 ">
          <Link to="/" className="flex items-center gap-2 font-semibold">
            <div className="flex h-8 w-8 items-center justify-center rounded-lg bg-primary text-primary-foreground">
              <Home className="size-5" />
            </div>
            <span>{t("Sidebar.app_name")}</span>
          </Link>
        </div>
        <div className="flex-1 overflow-auto py-4">
          <nav className="grid gap-1 px-2">
            {navItems.map((item, index) => {
              const isActive = item.to === location.pathname;
              return (
                <Link
                  key={index}
                  to={item.to}
                  className={cn(
                    "flex items-center gap-3 rounded-lg px-3 py-2 transition-all hover:bg-muted hover:text-primary",
                    isActive
                      ? "bg-muted text-primary"
                      : "text-muted-foreground",
                  )}
                >
                  <item.icon className="h-4 w-4" />
                  {item.label}
                </Link>
              );
            })}
          </nav>
        </div>
        <div className="p-4 flex justify-end gap-2">
          <SwitchThemeButton />
          <SwitchLanguageButton />
        </div>
        <div className="border-t p-4">
          <div className="flex items-center gap-4">
            <Avatar>
              <AvatarImage src="/avatars/01.png" alt="@user" />
              <AvatarFallback>US</AvatarFallback>
            </Avatar>
            <div className="grid gap-1">
              <p className="text-sm font-medium leading-none">User Name</p>
              <p className="text-xs text-muted-foreground">user@example.com</p>
            </div>
          </div>
        </div>
      </div>
    </aside>
  );
}

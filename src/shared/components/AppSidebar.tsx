import { useTranslation } from "react-i18next";
import { Home } from "lucide-react";

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
import config from "../config";
import { Button } from "./ui/button";
const AppName = import.meta.env.VITE_APP_NAME;
export function AppSidebar({ className }: { className?: string }) {
  const { t } = useTranslation();
  const { open } = useSidebarContext();
  const navigation = config.navigation(t);
  const location = useLocation();

  return (
    <aside
      className={clsx(
        `lg:block sticky top-0  z-20 transition-all duration-300 ease-in-out  overflow-hidden @container`,
        `   bg-sidebar max-h-screen  flex-none sm:w-xs w-20`,
        className,
        open ? "max-lg:max-w-sm" : "max-lg:max-w-0 ",
      )}
    >
      <div className="flex h-full flex-col border-r bg-card w-full">
        <div className="flex h-15 items-center @max-3xs:justify-center border-b px-6  gap-4">
          <div className="size-8 bg-primary rounded-lg place-content-center text-primary-foreground">
            <Home className="size-5 m-auto " />
          </div>
          <Link
            to="/"
            className="flex items-center gap-2 font-semibold"
            title={t("Sidebar.app_name")}
          >
            <Button
              variant="link"
              className="@max-3xs:hidden text-lg p-0 cursor-pointer"
            >
              {AppName ?? t("Sidebar.app_name")}
            </Button>
          </Link>
        </div>
        <div className="flex-1 overflow-y-auto py-4 overflow-x-hidden">
          <nav className="grid gap-1 px-2 @max-3xs:place-content-center">
            {navigation.map((item, index) => {
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
                  <item.icon />
                  <span className="@max-3xs:hidden">{item.label}</span>
                </Link>
              );
            })}
          </nav>
        </div>
        <div className="p-4  flex @max-3xs:flex-col items-center justify-end gap-2 ">
          <SwitchThemeButton />
          <SwitchLanguageButton />
        </div>
        <div className="border-t p-4">
          <div className="flex items-center gap-4 @max-3xs:justify-center">
            <Avatar>
              <AvatarImage src="/avatars/01.png" alt="@user" />
              <AvatarFallback>US</AvatarFallback>
            </Avatar>
            <div className="grid gap-1 @max-3xs:hidden">
              <p className="text-sm font-medium leading-none">User Name</p>
              <p className="text-xs text-muted-foreground">user@example.com</p>
            </div>
          </div>
        </div>
      </div>
    </aside>
  );
}

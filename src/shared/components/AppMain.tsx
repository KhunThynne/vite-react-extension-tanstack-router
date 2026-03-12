import { useTranslation } from "react-i18next";
import { Button } from "@/shared/components/ui/button";
import reactLogo from "@/assets/react.svg";
import viteLogo from "/vite.svg";
import tanstackLogo from "/tanstack.png";
import {
  Card,
  CardHeader,
  CardTitle,
  CardDescription,
  CardContent,
  CardFooter,
} from "@/shared/components/ui/card";
import { Link } from "@tanstack/react-router";
import { SwitchThemeButton } from "./SwitchThemeButton";
import { SwitchLanguageButton } from "./SwitchLanguageButton";
import { Separator } from "./ui/separator";
import clsx from "clsx";
import { useLocation } from "@tanstack/react-router";

export function AppMain() {
  const { t } = useTranslation();
  const location = useLocation();
  return (
    <div className="flex items-center justify-center h-full ">
      <Card
        className={clsx(
          "w-full max-w-md ",
          location.pathname !== "/"
            ? " bg-transparent border-transparent shadow-none"
            : "",
        )}
      >
        <CardHeader className="text-center">
          <div className="mx-auto">
            <img
              src="/icons/icon-512.png"
              className="size-24 transition-transform hover:scale-110 rounded-xl"
              alt="Extension logo"
            />
          </div>
          <CardTitle className="text-2xl font-bold">
            {t("AppMain.title")}
          </CardTitle>
          <CardDescription>{t("AppMain.description")}</CardDescription>
        </CardHeader>
        <CardContent className="space-y-4 text-center ">
          <div className="p-4 bg-secondary rounded-lg">
            <p className="text-lg font-medium">{t("Index.title")}</p>
          </div>
          <Separator />
          <div className="grid  gap-2">
            <div className="flex justify-center gap-2 ">
              <SwitchThemeButton />
              <SwitchLanguageButton />
            </div>
            <Link to={location.pathname === "/" ? "/showcase" : "/"}>
              {({ isActive }) => (
                <Button
                  size="lg"
                  disabled={isActive}
                  className="w-full cursor-pointer"
                  variant={location.pathname === "/" ? "default" : "link"}
                >
                  {location.pathname === "/"
                    ? t("AppMain.go_to_app")
                    : t("AppMain.back_to_main")}
                </Button>
              )}
            </Link>
          </div>

          <p className="text-sm text-muted-foreground">
            {t("AppMain.edit")}{" "}
            <code className="bg-muted px-1.5 py-0.5 rounded font-mono text-foreground">
              src/routes/index.tsx
            </code>
            {t("AppMain.save_to_test_hmr")}
          </p>
        </CardContent>
        <CardFooter className="justify-center flex flex-col space-y-1 ">
          <div className="flex gap-3 justify-items-center">
            <a href="https://vite.dev" target="_blank" rel="noreferrer">
              <img
                src={viteLogo}
                className="size-5 transition-transform hover:scale-110"
                alt="Vite logo"
              />
            </a>
            <a href="https://react.dev" target="_blank" rel="noreferrer">
              <img
                src={reactLogo}
                className="size-5 animate-spin-slow transition-transform hover:scale-110"
                alt="React logo"
              />
            </a>
            <a href="https://tanstack.com" target="_blank" rel="noreferrer">
              <img
                src={tanstackLogo}
                className="size-6 transition-transform hover:scale-110"
                alt="TanStack logo"
              />
            </a>
          </div>
          <p className="text-xs text-muted-foreground">
            {t("AppMain.learn_more")}
          </p>
        </CardFooter>
      </Card>
    </div>
  );
}

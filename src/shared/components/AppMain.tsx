import { useState } from "react";
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

export function AppMain() {
  const [count, setCount] = useState(0);
  const { t } = useTranslation();
  return (
    <div className="flex items-center justify-center h-full ">
      <Card className="w-full max-w-md shadow-lg">
        <CardHeader className="text-center">
          <div className="flex justify-center gap-4 mb-4">
            <a href="https://vite.dev" target="_blank" rel="noreferrer">
              <img
                src={viteLogo}
                className="h-16 w-16 transition-transform hover:scale-110"
                alt="Vite logo"
              />
            </a>
            <a href="https://react.dev" target="_blank" rel="noreferrer">
              <img
                src={reactLogo}
                className="h-16 w-16 animate-spin-slow transition-transform hover:scale-110"
                alt="React logo"
              />
            </a>
            <a href="https://tanstack.com" target="_blank" rel="noreferrer">
              <img
                src={tanstackLogo}
                className="size-17 transition-transform hover:scale-110"
                alt="TanStack logo"
              />
            </a>
          </div>
          <CardTitle className="text-2xl font-bold">Vite</CardTitle>
          <CardDescription>
            Powered by Shadcn UI and Tailwind CSS
          </CardDescription>
        </CardHeader>
        <CardContent className="space-y-4 text-center">
          <div className="p-4 bg-secondary rounded-lg">
            <p className="text-lg font-medium">{t("Index.title")}</p>
          </div>
          <div className="flex flex-col   gap-2 justify-center">
            <Button
              onClick={() => setCount((count) => count + 1)}
              size="lg"
              className="font-semibold"
            >
              count is {count}
            </Button>
            <Button size="lg" className="font-semibold" variant={"secondary"}>
              <Link to="/showcase">Go to App</Link>
            </Button>
          </div>
          <p className="text-sm text-muted-foreground">
            Edit{" "}
            <code className="bg-muted px-1.5 py-0.5 rounded font-mono text-foreground">
              src/routes/index.tsx
            </code>{" "}
            and save to test HMR
          </p>
        </CardContent>
        <CardFooter className="justify-center">
          <p className="text-xs text-muted-foreground">
            Click on the Vite and React logos to learn more
          </p>
        </CardFooter>
      </Card>
    </div>
  );
}

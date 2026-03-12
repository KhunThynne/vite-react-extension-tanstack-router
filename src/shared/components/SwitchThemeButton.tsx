import { useTheme } from "next-themes";
import { Moon, Sun } from "lucide-react";
import { Button } from "@/shared/components/ui/button";
import clsx from "clsx";
export const SwitchThemeButton = ({
  className,
  ...buttonProps
}: React.ComponentProps<typeof Button>) => {
  const { setTheme, theme } = useTheme();
  return (
    <Button
      variant="outline"
      size="icon"
      className={clsx("cursor-pointer", className)}
      {...buttonProps}
      onClick={() => setTheme(theme === "dark" ? "light" : "dark")}
    >
      {theme === "light" ? (
        <Sun className="size-5" />
      ) : (
        <Moon className="size-5" />
      )}
      <span className="sr-only">Toggle Theme</span>
    </Button>
  );
};

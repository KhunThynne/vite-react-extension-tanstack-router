import { useTranslation } from "react-i18next";
import { Button } from "./ui/button";
import clsx from "clsx";
export const SwitchLanguageButton = ({
  className,
  ...buttonProps
}: React.ComponentProps<typeof Button>) => {
  const { i18n } = useTranslation();
  const language = i18n.language as "en" | "th";
  const changeLanguage = (lng: "en" | "th") => {
    i18n.changeLanguage(lng);
  };

  return (
    <Button
      {...buttonProps}
      size="icon"
      onClick={() => changeLanguage(language === "th" ? "en" : "th")}
      className={clsx("uppercase cursor-pointer", className)}
    >
      {language}
    </Button>
  );
};

import { useTranslation } from "react-i18next";
import { Button } from "./ui/button";
export const SwitchLanguageButton = (
  buttonProps: React.ComponentProps<typeof Button>,
) => {
  const { i18n } = useTranslation();
  const language = i18n.language as "en" | "th";
  const changeLanguage = (lng: "en" | "th") => {
    i18n.changeLanguage(lng);
  };

  return (
    <Button
      {...buttonProps}
      onClick={() => changeLanguage(language === "th" ? "en" : "th")}
      className="uppercase"
    >
      {language}
    </Button>
  );
};

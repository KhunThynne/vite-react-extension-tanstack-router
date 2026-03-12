import { Component, Database, FileText, LayoutDashboard } from "lucide-react";
import { type TFunction } from "i18next";

const navigation = (t: TFunction) => [
  {
    icon: LayoutDashboard,
    label: t("Sidebar.dashboard"),
    to: "/showcase",
  },
  {
    icon: FileText,
    label: t("Sidebar.forms_showcase"),
    to: "/showcase/forms",
  },
  {
    icon: Component,
    label: t("Sidebar.ui_showcase"),
    to: "/showcase/ui",
  },
  {
    icon: Database,
    label: t("Sidebar.db_showcase"),
    to: "/showcase/db",
  },
];

const config = { navigation };

export default config;

import type { DBModel } from "@/db";
import type { BaseAction } from "@/shared/types/BaseAction";

type BoilerAction = BaseAction<"Boiler", { id: DBModel<"user">["id"] }, string>;
type TESTAction = BaseAction<"Boiler", { id: DBModel<"user">["id"] }, string>;

export type ContentScriptActionType = BoilerAction;
export type ActionPayload<T extends ContentScriptActionType["type"]> = Extract<
  ContentScriptActionType,
  { type: T }
>["payload"];

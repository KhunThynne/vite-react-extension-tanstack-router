import type { BaseAction } from "@/shared/types/BaseAction";

type BoilerAction = BaseAction<"Boiler", void, string>;
export type ContentScriptActionType = BoilerAction;
export type ActionPayload<T extends ContentScriptActionType["type"]> = Extract<
  ContentScriptActionType,
  { type: T }
>["payload"];

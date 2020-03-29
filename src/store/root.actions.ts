import { ActionType } from "typesafe-actions";

import * as generalActions from "../services/general/general.actions";

type GeneralActions = ActionType<typeof generalActions>;

export type RootAction = GeneralActions;

declare module "typesafe-actions" {
  interface Types {
    RootAction: RootAction;
  }
}

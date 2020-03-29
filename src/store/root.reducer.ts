import { combineReducers } from "redux";
import { StateType } from "typesafe-actions";
import general from "../services/general/general.reducer";

export const rootReducer = combineReducers({
  general
});

export type RootState = StateType<typeof rootReducer>;

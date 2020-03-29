import { Epic } from "redux-observable";
import { RootState } from "./root.reducer";
import { RootAction } from "./root.actions";

export type RootEpic = Epic<RootAction, RootAction, RootState>;

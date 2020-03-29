import { combineEpics } from "redux-observable";

import generalEpic from "../services/general/general.epics";

export const rootEpic = combineEpics(generalEpic);

import { applyMiddleware, compose, createStore } from "redux";
/* eslint-disable-next-line */
import { composeWithDevTools } from "redux-devtools-extension";
import { createEpicMiddleware } from "redux-observable";

import { rootReducer, RootState } from "./root.reducer";
import { rootEpic } from "./root.epic";
import customMiddleware from "./customeMiddleware";
import { RootAction } from "./root.actions";

const epicMiddleware = createEpicMiddleware<
  RootAction,
  RootAction,
  RootState
>();

const middlewares = [customMiddleware, epicMiddleware];

const enhancers =
  process.env.NODE_ENV === "development"
    ? composeWithDevTools(applyMiddleware(...middlewares))
    : compose(applyMiddleware(...middlewares));

const store = createStore(rootReducer, enhancers);

epicMiddleware.run(rootEpic);

export default store;

import { Middleware } from "redux";
import { RootState } from "./root.reducer";

const customMiddleware: Middleware<{}, RootState> = store => next => action => {
  try {
    // const prevState = store.getState();
    next(action);
  } catch (e) {
    console.error("customMiddleware error", e);
  }
};

export default customMiddleware;

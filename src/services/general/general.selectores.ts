import { RootState } from "../../store/root.reducer";

const root = (state: RootState) => state.general;
export const getLoading = (state: RootState) => root(state).loading;
export const getMessages = (state: RootState) => root(state).messages;
export const getConnected = (state: RootState) => root(state).connected;
export const getError = (state: RootState) => root(state).error;

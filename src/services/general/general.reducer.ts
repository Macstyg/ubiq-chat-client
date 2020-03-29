import { createReducer } from "typesafe-actions";
import * as actions from "./general.actions";
import { MessageData } from "./general.actions";

interface State {
  loading: boolean;
  connected: boolean;
  messages: MessageData[];
  error: string;
}

const initialState: State = {
  loading: false,
  connected: false,
  messages: [],
  error: ""
};

const generalReducer = createReducer(initialState)
  .handleAction(
    [actions.openStreamRequest, actions.closeStreamRequest],
    state => {
      return {
        ...state,
        loading: true
      };
    }
  )
  .handleAction([actions.openStreamSuccess], state => {
    return {
      ...state,
      loading: false,
      connected: true
    };
  })
  .handleAction([actions.openStreamFailed], (state, { payload }) => {
    return {
      ...state,
      loading: false,
      connected: false,
      error: payload
    };
  })
  .handleAction(actions.messageReceived, (state, { payload }) => {
    return {
      ...state,
      messages: [...state.messages, payload]
    };
  })
  .handleAction(actions.closeStreamSuccess, state => {
    return {
      ...initialState
    };
  })
  .handleAction(actions.closeStreamFailed, state => {
    return {
      ...state,
      loading: false
    };
  })
  .handleAction(actions.resetErrorMessage, state => {
    return {
      ...state,
      error: ""
    };
  });

export default generalReducer;

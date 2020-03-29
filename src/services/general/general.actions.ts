import { createAction } from "typesafe-actions";

export interface MessageData {
  id: string;
  text: string;
  createdBy: string;
  date: string;
}

export const openStreamRequest = createAction(
  "OPEN_STREAM",
  (payload: { userName: string; history: any }) => payload
)();
export const openStreamSuccess = createAction("OPEN_STREAM_SUCCESS")();
export const openStreamFailed = createAction(
  "OPEN_STREAM_FAILED",
  (payload: string) => payload
)();

export const closeStreamRequest = createAction("CLOSE_STREAM")();
export const closeStreamSuccess = createAction("CLOSE_STREAM_SUCCESS")();
export const closeStreamFailed = createAction("CLOSE_STREAM_FAILED")();

export const messageReceived = createAction(
  "MESSAGE_RECEIVED",
  (payload: MessageData) => payload
)();

export const sendMessageRequest = createAction(
  "SEND_MESSAGE_REQUESTED",
  (payload: string) => payload
)();
export const sendMessageSuccess = createAction("SEND_MESSAGE_SUCCESS")();
export const sendMessageFailure = createAction("SEND_MESSAGE_FAILURE")();

export const resetErrorMessage = createAction("RESET_ERROR_MESSAGE")();

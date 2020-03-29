import { combineEpics } from "redux-observable";
import { filter, mergeMap, map, catchError } from "rxjs/operators";
import { isActionOf } from "typesafe-actions";

import { RootEpic } from "../../store/store.types";
import {
  openStreamRequest,
  openStreamFailed,
  sendMessageRequest,
  sendMessageFailure,
  sendMessageSuccess,
  openStreamSuccess,
  messageReceived,
  closeStreamRequest,
  closeStreamFailed,
  closeStreamSuccess
} from "./general.actions";
import { of, from, empty, merge, race } from "rxjs";
import {
  createSocketIoConnection,
  sendSocketMessage,
  subscribe,
  closeSocket
} from "../../websockets/websockets";
import {
  CHAT_MESSAGE,
  WELCOME,
  NOT_UNIQUE_LOGIN,
  IDLE_DISCONNECT
} from "../../contants/events";

const connectionEpic: RootEpic = action$ =>
  action$.pipe(
    filter(isActionOf(openStreamRequest)),
    mergeMap(({ payload: { userName, history } }) => {
      createSocketIoConnection(userName);
      return merge(
        from(subscribe(WELCOME)).pipe(
          map(() => {
            history.push("/chat");
            return openStreamSuccess();
          })
        ),
        from(subscribe("connect_error")).pipe(
          map(() => {
            return openStreamFailed("Server unavailable.");
          })
        ),
        from(subscribe(NOT_UNIQUE_LOGIN)).pipe(
          map(() => {
            history.push("/");
            return openStreamFailed(
              "Failed to connect. Nickname already taken."
            );
          })
        )
      );
    }),
    catchError(error => {
      console.error("error", error);
      return of(openStreamFailed("Server unavailable."));
    })
  );

const sendMessageEpic: RootEpic = action$ =>
  action$.pipe(
    filter(isActionOf(sendMessageRequest)),
    map(({ payload }) => {
      sendSocketMessage(CHAT_MESSAGE, payload);
      return sendMessageSuccess();
    }),
    catchError(error => {
      console.error(error);
      return of(sendMessageFailure());
    })
  );

const websocketEpic: RootEpic = action$ =>
  action$.pipe(
    filter(isActionOf([openStreamSuccess, messageReceived])),
    mergeMap(() =>
      from(subscribe(CHAT_MESSAGE)).pipe(
        map((data: any) => {
          console.log("data", data);

          return messageReceived(data);
        }),
        catchError(error => {
          console.error(error);
          return empty();
        })
      )
    )
  );

const webSocketDisconnectEpic: RootEpic = action$ =>
  action$.pipe(
    filter(isActionOf(openStreamSuccess)),
    mergeMap(() => {
      return race(
        from(subscribe("disconnect")).pipe(
          map((data: any) => {
            console.log("disconnect >> data", data);
            return openStreamFailed(data);
          })
        ),
        from(subscribe(IDLE_DISCONNECT)).pipe(
          map(() => {
            return openStreamFailed(
              "Disconnected by the server due to inactivity"
            );
          })
        )
      );
    })
  );

const closeStreamEpic: RootEpic = action$ =>
  action$.pipe(
    filter(isActionOf([closeStreamRequest])),
    map(() => {
      closeSocket();
      return closeStreamSuccess();
    }),
    catchError(error => {
      return of(closeStreamFailed());
    })
  );

export default combineEpics(
  connectionEpic,
  sendMessageEpic,
  websocketEpic,
  closeStreamEpic,
  webSocketDisconnectEpic
);

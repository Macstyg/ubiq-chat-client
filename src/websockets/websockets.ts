import io from "socket.io-client";
import { ENDPOINT } from "../contants/constants";
import { RootAction } from "../store/root.actions";
import store from "../store/store";
import { openStreamSuccess } from "../services/general/general.actions";
import { ActionCreator } from "typesafe-actions";

const ws: Record<string, any> = {
  default: ""
};

export const createSocketIoConnection = (userName: string) => {
  console.log("connecting...");

  ws["default"] = io(ENDPOINT, {
    transports: ["websocket"],
    query: { userName }
  });
};

export const subscribe = (event: string) => {
  return new Promise((res, rej) => {
    ws["default"].on(event, (data?: any) => {
      console.log("Received message on:", event, ":", data);
      res(data);
    });
  });
};

export const sendSocketMessage = (event: string, message: string) => {
  console.log("Sending message to:", event, ":", message);
  ws["default"].emit(event, message);
};

export const closeSocket = () => {
  ws["default"].close();
};

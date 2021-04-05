import { WebSocketParams } from "domain/models/WebSocket";

export enum ActionType {
  WS_CONNECT = 'WS_CONNECT',
  WS_CONNECTED = 'WS_CONNECTED',
  WS_DISCONNECT = 'WS_DISCONNECT',
  WS_DISCONNECTED = 'WS_DISCONNECTED',
  WS_SEND_MESSAGE = 'WS_SEND_MESSAGE',
};

export const wsConnect = (host: string) => {
  return {
    type: ActionType.WS_CONNECT,
    host,
  }
};

export const wsDisconnect = () => {
  return {
    type: ActionType.WS_DISCONNECT,
  }
};

export const wsSendMessage = (msg: WebSocketParams) => {
  return {
    type: ActionType.WS_SEND_MESSAGE,
    msg
  }
};
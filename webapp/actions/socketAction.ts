import { WebSocketParams } from "domain/models/WebSocket";

export const wsConnect = (host: string) => ({ type: 'WS_CONNECT', host });
export const wsDisconnect = () => ({ type: 'WS_DISCONNECT' });
export const wsSendMessage = (msg: WebSocketParams) => ({ type: 'WS_SEND_MESSAGE', msg });

export enum WebSocketEvents {
  WS_CONNECT = 'WS_CONNECT',
  WS_CONNECTED = 'WS_CONNECTED',
  WS_DISCONNECT = 'WS_DISCONNECT',
  WS_DISCONNECTED = 'WS_DISCONNECTED',
  WS_SEND_MESSAGE = 'WS_SEND_MESSAGE',
};

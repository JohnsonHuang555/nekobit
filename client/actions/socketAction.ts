export const wsConnect = (host: string) => ({ type: 'WS_CONNECT', host });
export const wsConnected = () => ({ type: 'WS_CONNECTED' });
export const wsDisconnect = () => ({ type: 'WS_DISCONNECT' });
export const wsDisconnected = () => ({ type: 'WS_DISCONNECTED' });

export enum WebSocketEvents {
  WS_CONNECT = 'WS_CONNECT',
  WS_CONNECTED = 'WS_CONNECTED',
  WS_DISCONNECT = 'WS_DISCONNECT',
  WS_DISCONNECTED = 'WS_DISCONNECTED',
};

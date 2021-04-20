import {
  ActionType,
  wsConnected,
  wsDisConnected,
} from 'actions/WebSocketAction';

let webSocket: WebSocket;
const socketMiddleware = (store: any) => (next: any) => (action: any) => {
  switch (action.type) {
    case ActionType.WS_CONNECT: {
      webSocket = new WebSocket(action.host);

      webSocket.onopen = () => {
        store.dispatch(wsConnected());
      };

      webSocket.onclose = () => {
        store.dispatch(wsDisConnected());
      };

      webSocket.onmessage = (e) => {};
      break;
    }
    case ActionType.WS_SEND_MESSAGE: {
      break;
    }
    case ActionType.WS_DISCONNECT: {
      webSocket.close();
      break;
    }
  }
  return next(action);
};

export default socketMiddleware;

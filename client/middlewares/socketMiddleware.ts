import { WebSocketEvents, wsDisconnected } from "actions/socketAction";
import { SocketEvent } from "domain/models/WebSocket";
import { wsConnected } from "slices/webSocketSlice";

const SocketMiddleware = () => {
  let socket: WebSocket;
  const onOpen = store => (event) => {
    console.log('connect successfully')
    store.dispatch(wsConnected());
  };

  const onClose = store => () => {
    store.dispatch(wsDisconnected());
  };

  const onMessage = store => (event) => {
    const payload = JSON.parse(event.data);
    switch (payload.type) {
      case SocketEvent.JoinRoom:
        // store.dispatch(updateGame(payload.game));
        break;
      case SocketEvent.ReadyGame:
        // store.dispatch(updateTimer(payload.time));
        break;
      case SocketEvent.StartGame:
        console.log(payload);
        // store.dispatch(updateGamePlayer(payload.current_player));
        break;
      default:
        console.log(payload);
        break;
    }
  };
  return store => next => action => {
    switch (action.type) {
      case WebSocketEvents.WS_CONNECT: {
        if (socket !== undefined) {
          socket.close();
        }
        // connect to the remote host
        socket = new WebSocket(action.host);

        // websocket handlers
        socket.onmessage = onMessage(store);
        socket.onclose = onClose(store);
        socket.onopen = onOpen(store);
      }
    }
  }
};

export default SocketMiddleware;

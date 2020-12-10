import { WebSocketEvents } from "actions/socketAction";
import { PlayerFactory } from "domain/factories/PlayerFactory";
import { RoomFactory } from "domain/factories/RoomFactory";
import { SocketEvent } from "domain/models/WebSocket";
import { joinRoom, readyGame, startGame } from "slices/roomsSlice";
import { wsConnected, wsDisConnected } from "slices/webSocketSlice";

let webSocket: WebSocket;

const SocketMiddleware = (store: any) => (next: any) => (action: any) => {
  switch (action.type) {
    case WebSocketEvents.WS_CONNECT: {
      webSocket = new WebSocket(action.host);

      // Attach the callbacks
      webSocket.onopen = () => {
        store.dispatch(wsConnected());
      }

      webSocket.onclose = () => store.dispatch(wsDisConnected());

      webSocket.onmessage = (e) => {
        const { event, data } = JSON.parse(e.data);
        switch (event) {
          case SocketEvent.JoinRoom: {
            const room = RoomFactory.createFromNet(data.room_info);
            store.dispatch(joinRoom(room));
            break;
          }
          case SocketEvent.ReadyGame: {
            const players = PlayerFactory.createArrayFromNet(data.players);
            store.dispatch(readyGame(players));
            break;
          }
          case SocketEvent.StartGame: {
            const room = RoomFactory.createFromNet(data.room_info);
            store.dispatch(startGame(room));
            break;
          }
        }
      };
      break;
    }
    // User request to send a message
    case WebSocketEvents.WS_SEND_MESSAGE: {
      webSocket.send(JSON.stringify(action.msg));
      break;
    }

    // User request to disconnect
    case WebSocketEvents.WS_DISCONNECT: {
      webSocket.close();
      break;
    }
  };

  return next(action);
}

export default SocketMiddleware;

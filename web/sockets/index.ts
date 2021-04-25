import { joinRoom } from 'actions/RoomAction';
import {
  ActionType,
  wsConnected,
  wsDisConnected,
} from 'actions/WebSocketAction';
import { RoomFactory } from 'domain/factories/RoomFactory';
import { SocketEvent } from 'domain/models/WebSocket';

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

      webSocket.onmessage = (e) => {
        const { event, data, player_id } = JSON.parse(e.data);
        switch (event) {
          case SocketEvent.JoinRoom: {
            const room = RoomFactory.createFromNet(data.room_info);
            store.dispatch(joinRoom(room));
            break;
          }
          default: {
            throw new Error('You get bug. QAQ');
          }
        }
      };
      break;
    }
    case ActionType.WS_SEND_MESSAGE: {
      webSocket.send(JSON.stringify(action.msg));
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

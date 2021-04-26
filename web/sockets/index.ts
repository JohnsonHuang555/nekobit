import { joinRoom, leaveRoom, readyGame } from 'actions/RoomAction';
import {
  ActionType,
  wsConnected,
  wsDisConnected,
} from 'actions/WebSocketAction';
import { GameFactory } from 'domain/factories/GameFactory';
import { PlayerFactory } from 'domain/factories/PlayerFactory';
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
            const roomInfo = RoomFactory.createFromNet(data.room_info);
            const gameInfo = GameFactory.createFromNet(data.game_info);
            store.dispatch(joinRoom(roomInfo, gameInfo));
            break;
          }
          case SocketEvent.LeaveRoom: {
            const players = PlayerFactory.createArrayFromNet(data.players);
            console.log('leave', players);
            store.dispatch(leaveRoom(players));
          }
          case SocketEvent.ReadyGame: {
            const players = PlayerFactory.createArrayFromNet(data.players);
            store.dispatch(readyGame(players));
            break;
          }
          // case SocketEvent.StartGame: {
          //   const room = RoomFactory.createFromNet(data.room_info);
          //   store.dispatch(startGame(room));

          //   // 寫入所有遊戲的資料
          //   store.dispatch(setChineseChessGameData(room.gameData));
          //   break;
          // }
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

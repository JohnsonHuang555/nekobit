import { WebSocketEvents } from "actions/socketAction";
import { PlayerFactory } from "domain/factories/PlayerFactory";
import { RoomFactory } from "domain/factories/RoomFactory";
import { ChineseChessSocketEvent, SocketEvent } from "domain/models/WebSocket";
import { GameDataFactory } from "features/chinese_chess/domain/factories/GameDataFactory";
import {
  setCheckMate,
  setGameData as setChineseChessGameData,
} from "features/chinese_chess/slices/chineseChessSlice";
import {
  changePlayer,
  joinRoom,
  readyGame,
  setGameOver,
  setIsReadyToStart,
  startGame,
} from "slices/roomsSlice";
import { wsConnected, wsDisConnected } from "slices/webSocketSlice";

let webSocket: WebSocket;

const SocketMiddleware = (store: any) => (next: any) => (action: any) => {
  if (action && action.type) {
    switch (action.type) {
      case WebSocketEvents.WS_CONNECT: {
        webSocket = new WebSocket(action.host);

        // Attach the callbacks
        webSocket.onopen = () => {
          store.dispatch(wsConnected());
        };

        webSocket.onclose = () => store.dispatch(wsDisConnected());

        webSocket.onmessage = (e) => {
          const { event, data, player_id } = JSON.parse(e.data);
          switch (event) {
            case SocketEvent.JoinRoom: {
              const room = RoomFactory.createFromNet(data.room_info);
              store.dispatch(joinRoom(room));
              break;
            }
            // 按下準備遊戲後，都要把 isReadyToStart 設成 false
            case SocketEvent.ReadyGame: {
              const players = PlayerFactory.createArrayFromNet(data.players);
              store.dispatch(readyGame(players));
              store.dispatch(setIsReadyToStart(false));
              break;
            }
            // 按下開始遊戲後，等待倒數五秒後開始
            case SocketEvent.ReadyToStart: {
              store.dispatch(setIsReadyToStart(true));
              break;
            }
            case SocketEvent.StartGame: {
              const room = RoomFactory.createFromNet(data.room_info);
              store.dispatch(startGame(room));

              // 寫入所有遊戲的資料
              store.dispatch(setChineseChessGameData(room.gameData));
              break;
            }
            case SocketEvent.Surrender: {
              const { game_over } = data;
              store.dispatch(
                setGameOver({
                  isGameOver: game_over,
                  surrenderId: player_id,
                })
              );
              break;
            }
            // 象棋
            case ChineseChessSocketEvent.FlipChess: {
              const { game_data, now_turn } = data;
              const gameData = GameDataFactory.createFromNet(game_data);
              store.dispatch(setChineseChessGameData(gameData));
              store.dispatch(changePlayer(now_turn));
              break;
            }
            case ChineseChessSocketEvent.MoveChess: {
              const { game_data, now_turn, check_mate } = data;
              const gameData = GameDataFactory.createFromNet(game_data);
              store.dispatch(setChineseChessGameData(gameData));
              store.dispatch(changePlayer(now_turn));
              if (check_mate) {
                store.dispatch(
                  setCheckMate({
                    isCheck: true,
                    playerId: player_id,
                  })
                );
              }
              break;
            }
            case ChineseChessSocketEvent.EatChess: {
              const { game_data, now_turn, game_over, check_mate } = data;
              const gameData = GameDataFactory.createFromNet(game_data);
              store.dispatch(setChineseChessGameData(gameData));
              store.dispatch(changePlayer(now_turn));
              if (check_mate) {
                store.dispatch(
                  setCheckMate({
                    isCheck: true,
                    playerId: player_id,
                  })
                );
              }
              if (game_over) {
                store.dispatch(
                  setGameOver({
                    isGameOver: game_over,
                    surrenderId: "",
                  })
                );
              }
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
    }
  }

  return next(action);
};

export default SocketMiddleware;

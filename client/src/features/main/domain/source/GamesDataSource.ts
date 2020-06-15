import {
  SuccessCallback,
  ErrorCallback,
  SuccessWithoutResultCallback
} from "src/domain/source/base/RepositoryCallbacks";
import { TGame } from "src/features/main/domain/models/Game";
import { TSocket } from "src/types/Socket";
import { TUser } from "../models/User";

export namespace Games {
  export interface DataSource {
    getGames(callbacks: Games.GetGamesCallbacks): void;
    getGameInfo(id: string, callbacks: Games.GetGameInfoCallbacks): void;

    connectSocket(path: string, callbacks: Games.ConnectSocketCallbacks): void;
    getSocketMessage(callbacks: Games.GetSocketMessageCallbacks): void;
    getUserInfo(callbacks: Games.GetUserInfoCallbacks): void;

    // socket events
    createRoom(
      gameID: string,
      password: string,
      title: string,
      mode: number,
      callbacks: Games.CreateRoomCallbacks
    ): void;
    getRooms(): void;
    joinRoom(roomID: string): void;
    leaveRoom(roomID: string): void;
    readyGame(roomID: string): void;
    startGame(roomID: string, roomMode: number, gameID: string): void;
    setPlayOrder(roomID: string): void;
    gameOver(roomID: string): void;
  }

  export interface GetGamesCallbacks extends SuccessCallback<TGame[]>, ErrorCallback {}
  export interface GetGameInfoCallbacks extends SuccessCallback<TGame>, ErrorCallback {}
  export interface CreateRoomCallbacks extends SuccessCallback<string>, ErrorCallback {}
  export interface GetUserInfoCallbacks extends SuccessCallback<TUser>, ErrorCallback {}

  export interface ConnectSocketCallbacks extends SuccessWithoutResultCallback, ErrorCallback {}
  export interface GetSocketMessageCallbacks extends SuccessCallback<TSocket>, ErrorCallback {}
}

import {
  SuccessCallback,
  ErrorCallback,
  SuccessWithoutResultCallback
} from "src/domain/source/base/RepositoryCallbacks";
import { TGame } from "src/features/main/domain/models/Game";
import { TRoom, TRoomUser } from "../models/Room";
import { TUser } from "src/types/Account";
import { TSocket } from "src/types/Socket";

export namespace Games {
  export interface DataSource {
    getGames(callbacks: Games.GetGamesCallbacks): void;
    getGameInfo(id: string, callbacks: Games.GetGameInfoCallbacks): void;

    connectSocket(path: string, callbacks: Games.ConnectSocketCallbacks): void;
    getSocketMessage(callbacks: Games.GetSocketMessageCallbacks): void;
    createRoom(
      gameName: string,
      roomPassword: string,
      roomTitle: string,
      roomMode: number,
      callbacks: Games.CreateRoomCallbacks
    ): void;
    getRooms(callbacks: Games.GetRoomsCallbacks): void;

    joinRoom(roomID: number, callbacks: Games.JoinRoomCallbacks): void;
    leaveRoom(roomID: number, callbacks: Games.LeaveRoomCallbacks): void;
    readyGame(roomID: number, callbacks: Games.ReadyGameCallbacks): void;
    startGame(roomID: number, roomMode: number, callbacks: Games.StartGameCallbacks): void;

    getUserInfo(callbacks: Games.GetUserInfoCallbacks): void;
  }

  export interface GetGamesCallbacks extends SuccessCallback<TGame[]>, ErrorCallback {}
  export interface GetGameInfoCallbacks extends SuccessCallback<TGame>, ErrorCallback {}

  export interface ConnectSocketCallbacks extends SuccessWithoutResultCallback, ErrorCallback {}
  export interface GetSocketMessageCallbacks extends SuccessCallback<TSocket>, ErrorCallback {}

  export interface CreateRoomCallbacks extends SuccessCallback<number>, ErrorCallback {}
  export interface GetRoomsCallbacks extends SuccessCallback<TRoom[]>, ErrorCallback {}

  export interface JoinRoomCallbacks extends SuccessCallback<TRoom>, ErrorCallback {}
  export interface LeaveRoomCallbacks extends SuccessCallback<TRoom>, ErrorCallback {}
  export interface ReadyGameCallbacks extends SuccessCallback<TRoomUser[]>, ErrorCallback {}
  export interface StartGameCallbacks extends SuccessCallback<TRoom>, ErrorCallback {}

  export interface GetUserInfoCallbacks extends SuccessCallback<TUser>, ErrorCallback {}
}

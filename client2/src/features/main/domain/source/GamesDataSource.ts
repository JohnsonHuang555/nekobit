import {
  SuccessCallback,
  ErrorCallback,
  SuccessWithoutResultCallback
} from "src/domain/source/base/RepositoryCallbacks";
import { TGame } from "src/features/main/domain/models/Game";
import { TRoom } from "../models/Room";

export namespace Games {
  export interface DataSource {
    getGames(callbacks: Games.GetGamesCallbacks): void;
    getGameInfo(id: string, callbacks: Games.GetGameInfoCallbacks): void;

    createRoom(
      gameName: string,
      roomPassword: string,
      roomTitle: string,
      roomMode: number,
      callbacks: Games.CreateRoomCallbacks
    ): void;
    getRooms(callbacks: Games.GetRoomsCallbacks): void;
  }

  export interface GetGamesCallbacks extends SuccessCallback<TGame[]>, ErrorCallback {}
  export interface GetGameInfoCallbacks extends SuccessCallback<TGame>, ErrorCallback {}

  export interface CreateRoomCallbacks extends SuccessCallback<number>, ErrorCallback {}
  export interface GetRoomsCallbacks extends SuccessCallback<TRoom>, ErrorCallback {}
}

import { Games } from "src/features/main/domain/source/GamesDataSource";
import { IFetcher } from "src/api/Fetcher";
import { NetGame } from "src/features/main/domain/remote/NetGame";
import { GameFactory } from "src/features/main/domain/factories/GameFactory";
import { SocketEvent } from "src/types/Socket";
import { TRoom } from "../models/Room";

export default class GamesRepository implements Games.DataSource {
  private fetcher: IFetcher;

  constructor(fetcher: IFetcher) {
    this.fetcher = fetcher;
  }

  getGames(callbacks: Games.GetGamesCallbacks): void {
    this.fetcher.get('/getAllGames', {
      onSuccess: (result: NetGame[]) => {
        const games = GameFactory.createArrayFromNet(result);
        callbacks.onSuccess(games);
      },
      onError: (e) => {
        callbacks.onError(e);
      }
    });
  }

  getGameInfo(id: string, callbacks: Games.GetGameInfoCallbacks): void {
    this.fetcher.get(`/getGameInfo/${id}`, {
      onSuccess:(result: NetGame) => {
        const game = GameFactory.createFromNet(result);
        callbacks.onSuccess(game);
      },
      onError:(e) => {
        callbacks.onError(e);
      }
    });
  }

  getRooms(callbacks: Games.GetRoomsCallbacks): void {
    this.fetcher.sendSocket({ event: SocketEvent.GetRooms }, {
      onSuccess: (result: { rooms: TRoom }) => {
        callbacks.onSuccess(result.rooms);
      },
      onError: e => callbacks.onError(e),
    });
  }

  createRoom(
    gameName: string,
    roomPassword: string,
    roomTitle: string,
    roomMode: number,
    callbacks: Games.CreateRoomCallbacks
  ): void {
    this.fetcher.sendSocket({ event: SocketEvent.CreateRoom }, {
      onSuccess: (result: { roomID: number }) => {
        callbacks.onSuccess(result.roomID);
      },
      onError: e => callbacks.onError(e),
    });
  }
}

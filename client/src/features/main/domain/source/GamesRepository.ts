import { Games } from "src/features/main/domain/source/GamesDataSource";
import { IFetcher } from "src/api/Fetcher";
import { NetGame } from "src/features/main/domain/remote/NetGame";
import { GameFactory } from "src/features/main/domain/factories/GameFactory";
import { SocketEvent } from "src/types/Socket";
import { TRoom, TRoomUser } from "../models/Room";
import { TUser } from "src/types/Account";

export default class GamesRepository implements Games.DataSource {
  private fetcher: IFetcher;
  private userInfo: TUser | null = null;

  constructor(fetcher: IFetcher) {
    this.fetcher = fetcher;
    if (typeof window !== 'undefined' && localStorage.getItem('userInfo')) {
      this.userInfo = JSON.parse(localStorage.getItem('userInfo') || '');
    }
  }

  getUserInfo(callbacks: Games.GetUserInfoCallbacks): void {
    if (this.userInfo) {
      callbacks.onSuccess(this.userInfo);
    } else {
      const error = new Error();
      callbacks.onError(error);
    }
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

  connectSocket(path: string, callbacks: Games.ConnectSocketCallbacks): void {
    this.fetcher.createSocket(path, {
      onSuccess: () => callbacks.onSuccess(),
      onError: e => callbacks.onError(e)
    });
  }

  getSocketMessage(callbacks: Games.GetSocketMessageCallbacks): void {
    this.fetcher.getSocketMessage({
      onSuccess: (result) => {
        callbacks.onSuccess(result);
      },
      onError: e => callbacks.onError(e)
    });
  }

  getRooms(): void {
    this.fetcher.sendSocket({ event: SocketEvent.GetRooms });
  }

  createRoom(
    gameName: string,
    roomPassword: string,
    roomTitle: string,
    roomMode: number,
  ): void {
    this.fetcher.sendSocket(
      {
        userID: this.userInfo?.id,
        event: SocketEvent.CreateRoom,
        data: {
          gameName,
          roomPassword,
          roomTitle,
          roomMode,
          name: this.userInfo?.name
        }
      },
    );
  }

  joinRoom(roomID: number): void {
    this.fetcher.sendSocket(
      {
        userID: this.userInfo?.id,
        event: SocketEvent.JoinRoom,
        data: {
          roomID,
        }
      },
    );
  }

  leaveRoom(roomID: number): void {
    this.fetcher.sendSocket(
      {
        userID: this.userInfo?.id,
        event: SocketEvent.LeaveRoom,
        data: {
          roomID,
        }
      },
    );
  }

  readyGame(roomID: number): void {
    this.fetcher.sendSocket(
      {
        userID: this.userInfo?.id,
        event: SocketEvent.ReadyGame,
        data: {
          roomID,
        }
      },
    );
  }

  startGame(roomID: number, roomMode: number): void {
    this.fetcher.sendSocket(
      {
        userID: this.userInfo?.id,
        event: SocketEvent.StartGame,
        data: {
          roomID,
          roomMode,
        }
      },
    );
  }
}

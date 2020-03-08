import { Games } from "src/features/games/domain/source/GamesDataSource";
import { IFetcher } from "src/api/Fetcher";
import { NetGame } from "src/features/games/domain/remote/NetGame";
import { GameFactory } from "src/features/games/domain/factories/GameFactory";

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
}

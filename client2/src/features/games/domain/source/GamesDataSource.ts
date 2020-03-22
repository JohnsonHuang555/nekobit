import { SuccessCallback, ErrorCallback } from "src/domain/source/base/RepositoryCallbacks";
import { TGame } from "src/features/games/domain/models/Game";

export namespace Games {
  export interface DataSource {
    getGames(callbacks: Games.GetGamesCallbacks): void;
    getGameInfo(id: string, callbacks: Games.GetGameInfoCallbacks): void;
  }

  export interface GetGamesCallbacks extends SuccessCallback<TGame[]>, ErrorCallback {}
  export interface GetGameInfoCallbacks extends SuccessCallback<TGame>, ErrorCallback {}
}

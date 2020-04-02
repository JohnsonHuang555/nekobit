import { TGame } from "src/features/main/domain/models/Game";

export namespace IndexContract {
  export interface Presenter {
    mount(): void;
    getGames(): void;
  }

  export interface View {
    nowLoading(): void;
    finishLoading(): void;
    setGames(games: TGame[]): void;
  }
}

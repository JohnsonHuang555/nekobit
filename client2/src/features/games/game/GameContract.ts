import { TGame } from "src/features/games/domain/models/Game";
import { TRoom } from "../domain/models/Room";

export namespace GameContract {
  export type GamePageParams = { id: string };
  export interface Presenter {
    mount(params: GamePageParams): void;
    getGameInfo(id: string): void;
    getRooms(): void;
  }

  export interface View {
    nowLoading(): void;
    finishLoading(): void;
    setGameInfo(gameInfo: TGame): void;
    setRooms(rooms: TRoom[]): void;
  }
}
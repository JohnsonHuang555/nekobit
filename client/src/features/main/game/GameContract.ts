import { TGame } from "src/features/main/domain/models/Game";
import { TRoom } from "src/features/main/domain/models/Room";

export namespace GameContract {
  export type GamePageParams = { id: string };
  export interface Presenter {
    mount(params: GamePageParams): void;
    getGameInfo(id: string): void;
    getRooms(): void;
    createRoom(
      gameName: string,
      roomMode: number,
      roomPassword: string,
      roomTitle: string
    ): void;
  }

  export interface View {
    nowLoading(): void;
    finishLoading(): void;
    setGameInfo(gameInfo: TGame): void;
    setRooms(rooms: TRoom[]): void;
    setRoomID(id: number): void;
  }
}
import { TGame } from "src/features/main/domain/models/Game";
import { TRoom } from "src/features/main/domain/models/Room";

export namespace GameContract {
  export type GamePageParams = { id: string };
  export interface Presenter {
    mount(params: GamePageParams): void;
    getMessageHandler(): void;
    getGameInfo(id: string): void;
    getRooms(): void;
    createRoom(
      gameID: string,
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
    setRoomID(id: string): void;
  }
}
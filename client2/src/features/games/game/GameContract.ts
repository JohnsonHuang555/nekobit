import { TGame } from "src/features/games/domain/models/Game";
import { TRoom } from "src/features/games/domain/models/Room";
import { TUser } from "src/types/Account";

export namespace GameContract {
  export type GamePageParams = { id: string, userInfo: TUser };
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
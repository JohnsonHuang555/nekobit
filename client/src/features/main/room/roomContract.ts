import { TRoom } from "../domain/models/Room";

export namespace RoomContract {
  export type RoomPageParams = { id: string };
  export interface Presenter {
    mount(params: RoomPageParams): void;
    joinRoom(): void;
    leaveRoom(): void;
    readyGame(): void;
    startGame(mode: number): void;
  }

  export interface View {
    nowLoading(): void;
    finishLoading(): void;

    setRoomInfo(roomInfo: TRoom): void;
  }
}

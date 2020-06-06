import { TRoom } from "../domain/models/Room";
import { TUser } from "src/types/Account";

export namespace RoomContract {
  export type RoomPageParams = { id: string };
  export interface Presenter {
    mount(params: RoomPageParams): void;
    setPlayOrder(): void;
    getUserInfo(): void;
    getMessageHandler(): void;
    joinRoom(): void;
    leaveRoom(): void;
    readyGame(): void;
    startGame(mode: number, gameId: string): void;
  }

  export interface View {
    nowLoading(): void;
    finishLoading(): void;

    setRoomInfo(roomInfo: TRoom): void;
    setUserInfo(userInfo: TUser): void;
  }
}

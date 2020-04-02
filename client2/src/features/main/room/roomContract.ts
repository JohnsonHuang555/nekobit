export namespace RoomContract {
  export interface Presenter {
    mount(): void;
    joinRoom(): void;
    leaveRoom(): void;
    readyGame(): void;
    startGame(): void;
  }

  export interface View {
    nowLoading(): void;
    finishLoading(): void;
  }
}

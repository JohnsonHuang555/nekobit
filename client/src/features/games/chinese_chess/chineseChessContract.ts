import { TChineseChess } from 'src/features/games/domain/models/ChineseChess';
export namespace ChineseChessContract {
  export interface Presenter {
    mount(roomID: string): void;
    getMessageHandler(): void;

    onFlip(id: number): void;
    onEat(id: number, targetId: number): void;
    onMove(id: number, targetX: number, targetY: number): void;
  }
  export interface View {
    nowLoading(): void;
    finishLoading(): void;

    setChesses(chesses: TChineseChess[]): void;
  }
}

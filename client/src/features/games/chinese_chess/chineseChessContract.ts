import { TChineseChess } from 'src/features/games/domain/models/ChineseChess';
import { TRoomUser } from 'src/features/main/domain/models/Room';
export namespace ChineseChessContract {
  export interface Presenter {
    mount(roomID: string): void;
    getMessageHandler(): void;

    onSelect(id: number): void;
    onFlip(id: number): void;
    onEat(id: number, targetId: number): void;
    onMove(id: number, targetX: number, targetY: number): void;
  }
  export interface View {
    nowLoading(): void;
    finishLoading(): void;

    setChesses(gameData: TChineseChess[]): void;
    setSelectedChess(chess: TChineseChess): void;
    setNowTurn(nowTurn: string): void;
    setUserList(userList: TRoomUser[]): void;
  }
}

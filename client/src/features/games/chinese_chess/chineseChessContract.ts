import { TChineseChess, GameModeCode, ChessSide } from 'src/features/games/domain/models/ChineseChess';
import { TRoomUser } from 'src/features/main/domain/models/Room';
export namespace ChineseChessContract {
  export interface Presenter {
    mount(roomID: string, chesses: TChineseChess[]): void;
    getMessageHandler(): void;
    updateChesses(chesses: TChineseChess[]): void;

    onSelect(id: number): void;
    onFlip(id: number): void;
    onEat(id: number, targetId: number, gameMode: GameModeCode): void;
    onMove(id: number, targetX: number, targetY: number, gameMode: GameModeCode): void;
  }
  export interface View {
    nowLoading(): void;
    finishLoading(): void;

    setChesses(gameData: TChineseChess[]): void;
    setSelectedChess(chess?: TChineseChess): void;
    setNowTurn(nowTurn: string): void;
    setUserList(userList: TRoomUser[]): void;
    setIsGameOver(winnerSide: ChessSide): void;
  }
}

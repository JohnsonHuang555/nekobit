import { ChineseChess } from "src/features/games/chinese_chess/source/ChineseChessDataSource";
import { MoveChess } from "./base/MoveChessUseCaseItf";

export class MoveChessUseCase implements MoveChess.UseCase {
  private repository: ChineseChess.DataSource;
  constructor(repository: ChineseChess.DataSource) {
    this.repository = repository;
  }

  execute(inputData: MoveChess.InputData, callbacks: MoveChess.Callbacks) {
    const {
      roomID,
      chessID,
      targetX,
      targetY,
    } = inputData;
    this.repository.moveChess(roomID, chessID, targetX, targetY);
  }
}
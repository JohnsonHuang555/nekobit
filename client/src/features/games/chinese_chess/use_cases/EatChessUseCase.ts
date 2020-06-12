import { ChineseChess } from "src/features/games/chinese_chess/source/ChineseChessDataSource";
import { EatChess } from "./base/EatChessUseCaseItf";

export class EatChessUseCase implements EatChess.UseCase {
  private repository: ChineseChess.DataSource;
  constructor(repository: ChineseChess.DataSource) {
    this.repository = repository;
  }

  execute(inputData: EatChess.InputData, callbacks: EatChess.Callbacks) {
    const {
      roomID,
      chessID,
      targetChessID,
    } = inputData;
    this.repository.eatChess(roomID, chessID, targetChessID);
  }
}
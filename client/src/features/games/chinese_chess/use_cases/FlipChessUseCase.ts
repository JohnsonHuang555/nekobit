import { ChineseChess } from "src/features/games/chinese_chess/source/ChineseChessDataSource";
import { FlipChess } from "./base/FlipChessUseCaseItf";

export class FlipChessUseCase implements FlipChess.UseCase {
  private repository: ChineseChess.DataSource;
  constructor(repository: ChineseChess.DataSource) {
    this.repository = repository;
  }

  execute(inputData: FlipChess.InputData, callbacks: FlipChess.Callbacks) {
    const {
      roomID,
      chessID,
    } = inputData;
    this.repository.flipChess(roomID, chessID);
  }
}
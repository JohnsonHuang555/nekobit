import { ChineseChess } from "src/features/games/chinese_chess/source/ChineseChessDataSource";
import { MoveChess } from "./base/MoveChessUseCaseItf";
import { CheckMoveRange } from "../../helpers/CheckMoveRange";

export class ShortCrossMoveUseCase implements MoveChess.UseCase {
  private repository: ChineseChess.DataSource;
  constructor(repository: ChineseChess.DataSource) {
    this.repository = repository;
  }

  execute(inputData: MoveChess.InputData, callbacks: MoveChess.Callbacks) {
    const {
      roomID,
      selectedChess,
      targetX,
      targetY,
    } = inputData;
    const range = CheckMoveRange.shortCross(selectedChess.locationX, selectedChess.locationY);
    const isInRange = CheckMoveRange.isInRange(range, targetX, targetY);
    if (isInRange) {
      this.repository.moveChess(roomID, selectedChess.id, targetX, targetY);
      callbacks.onSuccess({});
    } else {
      const error = new Error('No in range');
      callbacks.onError(error);
    }
  }
}
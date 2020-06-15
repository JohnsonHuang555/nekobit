import { ChineseChess } from "src/features/games/chinese_chess/source/ChineseChessDataSource";
import { MoveOrEatChess, MoveOrEatCode } from "./base/MoveOrEatChessUseCaseItf";
import { CheckMoveRange } from "../../helpers/CheckMoveRange";
import { GameModeCode, TChineseChess, ChessName } from "../../domain/models/ChineseChess";

export class MoveOrEatChessUseCase implements MoveOrEatChess.UseCase {
  private repository: ChineseChess.DataSource;
  constructor(repository: ChineseChess.DataSource) {
    this.repository = repository;
  }

  execute(inputData: MoveOrEatChess.InputData, callbacks: MoveOrEatChess.Callbacks) {
    const {
      roomID,

      // eat
      selectedChess,
      targetChess,

      // move
      targetX,
      targetY,

      gameMode,
      action,
    } = inputData;

    switch (gameMode) {
      case GameModeCode.Standard: {
        // TODO: 大盤
        break;
      }
      case GameModeCode.Hidden: {
        const range = CheckMoveRange.shortCross(selectedChess.locationX, selectedChess.locationY);

        // 判斷移動還是吃棋
        switch (action) {
          case MoveOrEatCode.Move: {
            if (targetX === undefined || targetY === undefined) {
              const error = new Error('No target location');
              callbacks.onError(error);
              return;
            }

            const isInRange = CheckMoveRange.isInRange(range, targetX, targetY);
            if (isInRange) {
              this.repository.moveChess(roomID, selectedChess.id, targetX, targetY);
              callbacks.onSuccess({});
            } else {
              const error = new Error('No in range');
              callbacks.onError(error);
            }
            break;
          }
          case MoveOrEatCode.Eat: {
            if (!targetChess) {
              const error = new Error('No target chess');
              callbacks.onError(error);
              return;
            }

            const isInRange = CheckMoveRange.isInRange(range, targetChess.locationX, targetChess.locationY);

            if (isInRange || selectedChess.name === ChessName.CannonsBlack || selectedChess.name === ChessName.CannonsRed) {
              if (this.isEatable(selectedChess, targetChess)) {
                this.repository.eatChess(roomID, selectedChess.id, targetChess.id);
                callbacks.onSuccess({});
              }
            } else {
              const error = new Error('No in range');
              callbacks.onError(error);
            }
            break;
          }
        }
      }
      default: {
        const error = new Error('No mode found');
        callbacks.onError(error);
      }
    }
  }

  private isEatable(selectedChess: TChineseChess, targetChess: TChineseChess): boolean {
    if (selectedChess.name === ChessName.CannonsBlack || selectedChess.name === ChessName.CannonsRed) {
      // 包則不用判斷階級
      return true;
    } else if (
      (selectedChess.name === ChessName.SoldiersBlack || selectedChess.name === ChessName.SoldiersRed) &&
      (targetChess.name === ChessName.KingBlack || targetChess.name === ChessName.KingRed)
    ) {
      // 卒可以吃帥，兵可以吃將
      return true;
    } else if (
      (selectedChess.name === ChessName.KingBlack || selectedChess.name === ChessName.KingRed) &&
      (targetChess.name === ChessName.SoldiersBlack || targetChess.name === ChessName.SoldiersRed)
    ) {
      // 帥不可以吃卒，將不可以吃兵
      return false;
    } else if (
      (selectedChess.name === ChessName.SoldiersBlack || selectedChess.name === ChessName.SoldiersRed) &&
      (targetChess.name === ChessName.CannonsBlack || targetChess.name === ChessName.CannonsRed)
    ) {
      // 卒不可以吃炮，兵不可以吃包
      return false;
    } else {
      // 其餘則以階級判斷
      if (selectedChess.rank >= targetChess.rank) {
        return true
      }
      return false
    }
  }
}
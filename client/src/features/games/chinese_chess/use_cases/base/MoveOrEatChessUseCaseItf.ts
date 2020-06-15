import { TChineseChess, GameModeCode } from "src/features/games/domain/models/ChineseChess";
import {
  UseCaseInputData,
  UseCaseOutputData,
  UseCaseCallbacks,
  UseCase as BaseUseCase
} from "src/domain/usecases/base/UseCase";

export enum MoveOrEatCode {
  Move = 'move',
  Eat = 'eat',
}

export namespace MoveOrEatChess {
  export interface InputData extends UseCaseInputData {
    roomID: string;
    selectedChess: TChineseChess;
    targetChess?: TChineseChess;
    targetX?: number;
    targetY?: number;
    gameMode: GameModeCode;
    action: MoveOrEatCode;
  }

  export interface OutputData extends UseCaseOutputData {}

  export interface Callbacks extends UseCaseCallbacks<OutputData> {}

  export interface UseCase extends BaseUseCase<InputData, OutputData> {}
}

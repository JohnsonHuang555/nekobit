import { TChineseChess } from "src/features/games/domain/models/ChineseChess";
import {
  UseCaseInputData,
  UseCaseOutputData,
  UseCaseCallbacks,
  UseCase as BaseUseCase
} from "src/domain/usecases/base/UseCase";

export namespace MoveChess {
  export interface InputData extends UseCaseInputData {
    roomID: string;
    selectedChess: TChineseChess;
    targetX: number;
    targetY: number;
  }

  export interface OutputData extends UseCaseOutputData {}

  export interface Callbacks extends UseCaseCallbacks<OutputData> {}

  export interface UseCase extends BaseUseCase<InputData, OutputData> {}
}

import {
  UseCaseInputData,
  UseCaseOutputData,
  UseCaseCallbacks,
  UseCase as BaseUseCase
} from "src/domain/usecases/base/UseCase";
import { TChineseChess } from "src/features/games/domain/models/ChineseChess";

export namespace GetSocketMessage {
  export interface InputData extends UseCaseInputData {
    chesses: TChineseChess[];
  }

  export interface OutputData extends UseCaseOutputData {
    chesses: TChineseChess[];
  }

  export interface Callbacks extends UseCaseCallbacks<OutputData> {}

  export interface UseCase extends BaseUseCase<InputData, OutputData> {}
}

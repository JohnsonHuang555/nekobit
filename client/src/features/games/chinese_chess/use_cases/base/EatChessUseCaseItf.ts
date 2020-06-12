import {
  UseCaseInputData,
  UseCaseOutputData,
  UseCaseCallbacks,
  UseCase as BaseUseCase
} from "src/domain/usecases/base/UseCase";

export namespace EatChess {
  export interface InputData extends UseCaseInputData {
    roomID: string;
    chessID: number;
    targetChessID: number;
  }

  export interface OutputData extends UseCaseOutputData {}

  export interface Callbacks extends UseCaseCallbacks<OutputData> {}

  export interface UseCase extends BaseUseCase<InputData, OutputData> {}
}

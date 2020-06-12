import {
  UseCaseInputData,
  UseCaseOutputData,
  UseCaseCallbacks,
  UseCase as BaseUseCase
} from "src/domain/usecases/base/UseCase";

export namespace StartGame {
  export interface InputData extends UseCaseInputData {
    roomID: string;
    roomMode: number;
    gameID: string;
  }

  export interface OutputData extends UseCaseOutputData {}

  export interface Callbacks extends UseCaseCallbacks<OutputData> {}

  export interface UseCase extends BaseUseCase<InputData, OutputData> {}
}

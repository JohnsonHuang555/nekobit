import {
  UseCaseInputData,
  UseCaseOutputData,
  UseCaseCallbacks,
  UseCase as BaseUseCase
} from "src/domain/usecases/base/UseCase";

export namespace CreateRoom {
  export interface InputData extends UseCaseInputData {
    gameName: string;
    roomPassword: string;
    roomTitle: string;
    roomMode: number;
  }

  export interface OutputData extends UseCaseOutputData {
    roomID: number;
  }

  export interface Callbacks extends UseCaseCallbacks<OutputData> {}

  export interface UseCase extends BaseUseCase<InputData, OutputData> {}
}

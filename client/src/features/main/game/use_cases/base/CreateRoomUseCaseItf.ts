import {
  UseCaseInputData,
  UseCaseOutputData,
  UseCaseCallbacks,
  UseCase as BaseUseCase
} from "src/domain/usecases/base/UseCase";

export namespace CreateRoom {
  export interface InputData extends UseCaseInputData {
    gameID: string;
    password: string;
    title: string;
    mode: number;
  }

  export interface OutputData extends UseCaseOutputData {
    id: string;
  }

  export interface Callbacks extends UseCaseCallbacks<OutputData> {}

  export interface UseCase extends BaseUseCase<InputData, OutputData> {}
}

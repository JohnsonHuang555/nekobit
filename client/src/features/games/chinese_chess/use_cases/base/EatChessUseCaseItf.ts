import {
  UseCaseInputData,
  UseCaseOutputData,
  UseCaseCallbacks,
  UseCase as BaseUseCase
} from "src/domain/usecases/base/UseCase";
import { TRoom } from "src/features/main/domain/models/Room";

export namespace GetSocketMessage {
  export interface InputData extends UseCaseInputData {}

  export interface OutputData extends UseCaseOutputData {}

  export interface Callbacks extends UseCaseCallbacks<OutputData> {}

  export interface UseCase extends BaseUseCase<InputData, OutputData> {}
}

import {
  UseCaseInputData,
  UseCaseOutputData,
  UseCaseCallbacks,
  UseCase as BaseUseCase
} from "src/domain/usecases/base/UseCase";
import { TGame } from "src/features/main/domain/models/Game";

export namespace GetGameInfo {
  export interface InputData extends UseCaseInputData {
    id: string;
  }

  export interface OutputData extends UseCaseOutputData {
    gameInfo: TGame;
  }

  export interface Callbacks extends UseCaseCallbacks<OutputData> {}

  export interface UseCase extends BaseUseCase<InputData, OutputData> {}
}

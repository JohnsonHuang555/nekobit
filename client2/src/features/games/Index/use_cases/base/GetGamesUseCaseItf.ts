import {
  UseCaseInputData,
  UseCaseOutputData,
  UseCaseCallbacks,
  UseCase as BaseUseCase
} from "src/domain/usecases/UseCase";
import { TGame } from "src/features/games/domain/models/Game";

export namespace GetGames {
  export interface InputData extends UseCaseInputData {}

  export interface OutputData extends UseCaseOutputData {
    games: TGame[];
  }

  export interface Callbacks extends UseCaseCallbacks<OutputData> {}

  export interface UseCase extends BaseUseCase<InputData, OutputData> {}
}

import {
  UseCaseInputData,
  UseCaseOutputData,
  UseCase as BaseUseCase
} from "src/domain/usecases/base/UseCase";
import { TGame } from "src/features/main/domain/models/Game";

export namespace GetGames {
  export interface InputData extends UseCaseInputData {}

  export interface OutputData extends UseCaseOutputData {
    games: TGame[];
  }

  export interface UseCase extends BaseUseCase<InputData, OutputData> {}
}

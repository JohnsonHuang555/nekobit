import {
  UseCaseInputData,
  UseCaseOutputData,
  UseCaseCallbacks,
  UseCase as BaseUseCase
} from "src/domain/usecases/base/UseCase";
import { TRoomUser } from "src/features/main/domain/models/Room";

export namespace ReadyGame {
  export interface InputData extends UseCaseInputData {
    userID: string;
    roomID: number;
  }

  export interface OutputData extends UseCaseOutputData {
    gameData: any;
  }

  export interface Callbacks extends UseCaseCallbacks<OutputData> {}

  export interface UseCase extends BaseUseCase<InputData, OutputData> {}
}
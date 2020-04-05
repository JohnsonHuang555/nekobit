import {
  UseCaseInputData,
  UseCaseOutputData,
  UseCaseCallbacks,
  UseCase as BaseUseCase
} from "src/domain/usecases/base/UseCase";
import { TRoomUser, TRoom } from "src/features/main/domain/models/Room";

export namespace StartGame {
  export interface InputData extends UseCaseInputData {
    roomID: number;
    roomMode: number;
  }

  export interface OutputData extends UseCaseOutputData {
    roomInfo: TRoom;
  }

  export interface Callbacks extends UseCaseCallbacks<OutputData> {}

  export interface UseCase extends BaseUseCase<InputData, OutputData> {}
}

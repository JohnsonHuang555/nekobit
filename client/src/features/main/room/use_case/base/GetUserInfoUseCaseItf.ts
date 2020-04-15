import {
  UseCaseInputData,
  UseCaseOutputData,
  UseCaseCallbacks,
  UseCase as BaseUseCase
} from "src/domain/usecases/base/UseCase";
import { TUser } from "src/types/Account";

export namespace GetUserInfo {
  export interface InputData extends UseCaseInputData {}

  export interface OutputData extends UseCaseOutputData {
    userInfo: TUser;
  }

  export interface Callbacks extends UseCaseCallbacks<OutputData> {}

  export interface UseCase extends BaseUseCase<InputData, OutputData> {}
}

import {
  UseCaseInputData,
  UseCaseOutputData,
  UseCase,
  UseCaseCallbacks
} from "src/domain/usecases/base/UseCase";

export class UseCaseHandler {

  static _INSTANCE: null | UseCaseHandler = null;

  static get INSTANCE(): UseCaseHandler {
    if (!this._INSTANCE) {
      this._INSTANCE = new UseCaseHandler();
    }
    return this._INSTANCE;
  }

  execute<I extends UseCaseInputData, O extends UseCaseOutputData>(
    useCase: UseCase<I, O>,
    inputData: I,
    useCaseCallbacks?: UseCaseCallbacks<O>
  ): void {
    if (useCaseCallbacks) {
      useCase.execute(inputData, useCaseCallbacks);
    } else {
      useCase.execute(inputData);
    }
  }
}

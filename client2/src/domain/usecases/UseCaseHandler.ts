import {
  UseCaseInputData,
  UseCaseOutputData,
  UseCase,
  UseCaseCallbacks
} from "src/domain/usecases/UseCase";

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
    useCaseCallbacks: UseCaseCallbacks<O>
  ): void {
    useCase.execute(inputData, useCaseCallbacks);
  }
}

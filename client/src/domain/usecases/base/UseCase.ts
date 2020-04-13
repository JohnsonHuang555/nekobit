export interface UseCaseInputData {}

export interface UseCaseOutputData {}

export interface UseCaseCallbacks<R> {
  onSuccess: (result: R) => void;
  onError: (e: Error) => void;
}

export abstract class UseCase<I extends UseCaseInputData, O extends UseCaseOutputData> {
  abstract execute(inputData: I, callbacks?: UseCaseCallbacks<O>): void;
}

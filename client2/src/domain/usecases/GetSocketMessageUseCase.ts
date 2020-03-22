import { GetSocketMessage } from "src/domain/usecases/base/GetMessageUseCaseItf";
import { App } from "src/domain/source/AppDataSource";

export class GetSocketMessageUseCase implements GetSocketMessage.UseCase {
  private repository: App.DataSource;

  constructor(repository: App.DataSource) {
    this.repository = repository;
  }

  execute(inputData: GetSocketMessage.InputData, callbacks: GetSocketMessage.Callbacks) {
    this.repository.getSocketMessage({
      onSuccess: (result: any) => {
        callbacks.onSuccess({ socketData: result });
      },
      onError: callbacks.onError,
    });
  }
}

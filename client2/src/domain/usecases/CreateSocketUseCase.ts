import { App } from "src/domain/source/AppDataSource";
import { CreateSocket } from "./base/CreateSocketUseCaseItf";

export class CreateSocketUseCase implements CreateSocket.UseCase {
  private repository: App.DataSource;

  constructor(repository: App.DataSource) {
    this.repository = repository;
  }

  execute(inputData: CreateSocket.InputData, callbacks: CreateSocket.Callbacks) {
    const { path } = inputData;
    this.repository.createSocket(path, {
      onSuccess: () => {
        console.log(123456)
        callbacks.onSuccess({});
      },
      onError: callbacks.onError,
    });
  }
}

import { ConnectSocket } from "./base/ConnectSocketUseCaseItf";
import { Games } from "../../domain/source/GamesDataSource";

export class ConnectSocketUseCase implements ConnectSocket.UseCase {
  private repository: Games.DataSource;

  constructor(repository: Games.DataSource) {
    this.repository = repository;
  }

  execute(inputData: ConnectSocket.InputData, callbacks: ConnectSocket.Callbacks) {
    const { path } = inputData;
    this.repository.connectSocket(path, {
      onSuccess: () => {
        callbacks.onSuccess({});
      },
      onError: callbacks.onError,
    });
  }
}

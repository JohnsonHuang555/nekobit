import { App } from "src/domain/source/AppDataSource";
import { SocketEvent } from "src/types/Socket";
import { ReadyGame } from "./base/ReadyGameUseCaseItf";

export class ReadyGameUseCase implements ReadyGame.UseCase {
  private repository: App.DataSource;

  constructor(repository: App.DataSource) {
    this.repository = repository;
  }

  execute(inputData: ReadyGame.InputData, callbacks: ReadyGame.Callbacks) {
    const {
      userID,
      roomID,
    } = inputData;

    const data = {
      name,
      roomID,
    };

    this.repository.sendSocket({ userID, event: SocketEvent.LeaveRoom, data } , {
      onSuccess: (result) => {
        callbacks.onSuccess({ gameData: result.roomInfo.gameData });
      },
      onError: callbacks.onError,
    });
  }
}

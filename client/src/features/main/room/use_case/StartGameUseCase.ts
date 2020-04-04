import { App } from "src/domain/source/AppDataSource";
import { SocketEvent } from "src/types/Socket";
import { StartGame } from "./base/StartGameUseCaseItf";

export class StartGameUseCase implements StartGame.UseCase {
  private repository: App.DataSource;

  constructor(repository: App.DataSource) {
    this.repository = repository;
  }

  execute(inputData: StartGame.InputData, callbacks: StartGame.Callbacks) {
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
        callbacks.onSuccess({ userList: result.roomUserList });
      },
      onError: callbacks.onError,
    });
  }
}

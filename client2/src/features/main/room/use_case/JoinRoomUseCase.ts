import { JoinRoom } from "./base/JoinRoomUseCaseItf";
import { App } from "src/domain/source/AppDataSource";
import { SocketEvent } from "src/types/Socket";

export class JoinRoomUseCase implements JoinRoom.UseCase {
  private repository: App.DataSource;

  constructor(repository: App.DataSource) {
    this.repository = repository;
  }

  execute(inputData: JoinRoom.InputData, callbacks: JoinRoom.Callbacks) {
    const {
      userID,
      name,
      roomID,
    } = inputData;

    const data = {
      name,
      roomID,
    };

    this.repository.sendSocket({ userID, event: SocketEvent.JoinRoom, data } , {
      onSuccess: (result) => {
        callbacks.onSuccess({ roomInfo: result.roomInfo });
      },
      onError: callbacks.onError,
    });
  }
}

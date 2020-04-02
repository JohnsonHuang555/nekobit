import { App } from "src/domain/source/AppDataSource";
import { SocketEvent } from "src/types/Socket";
import { LeaveRoom } from "./base/LeaveRoomUseCaseItf";

export class LeaveRoomUseCase implements LeaveRoom.UseCase {
  private repository: App.DataSource;

  constructor(repository: App.DataSource) {
    this.repository = repository;
  }

  execute(inputData: LeaveRoom.InputData, callbacks: LeaveRoom.Callbacks) {
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
        callbacks.onSuccess({ roomInfo: result.roomInfo });
      },
      onError: callbacks.onError,
    });
  }
}

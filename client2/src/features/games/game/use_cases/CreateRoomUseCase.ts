import { CreateRoom } from "src/features/games/game/use_cases/base/CreateRoomUseCaseItf";
import { App } from "src/domain/source/AppDataSource";
import { SocketEvent } from "src/types/Socket";

export class CreateRoomUseCase implements CreateRoom.UseCase {
  private repository: App.DataSource;

  constructor(repository: App.DataSource) {
    this.repository = repository;
  }

  execute(inputData: CreateRoom.InputData, callbacks: CreateRoom.Callbacks) {
    const {
      userID,
      gameName,
      roomMode,
      roomPassword,
      roomTitle,
    } = inputData;

    const data = {
      gameName,
      roomMode,
      roomPassword,
      roomTitle,
    };

    this.repository.sendSocket({ userID, event: SocketEvent.CreateRoom, data }, {
      onSuccess: (result) => {
        callbacks.onSuccess({ roomID: result.roomID as number });
      },
      onError: callbacks.onError,
    });
  }
}

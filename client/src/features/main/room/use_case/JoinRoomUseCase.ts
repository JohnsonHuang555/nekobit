import { JoinRoom } from "./base/JoinRoomUseCaseItf";
import { Games } from "../../domain/source/GamesDataSource";

export class JoinRoomUseCase implements JoinRoom.UseCase {
  private repository: Games.DataSource;

  constructor(repository: Games.DataSource) {
    this.repository = repository;
  }

  execute(inputData: JoinRoom.InputData, callbacks: JoinRoom.Callbacks) {
    const {
      roomID,
    } = inputData;

    this.repository.joinRoom(roomID, {
      onSuccess: (result) => {
        callbacks.onSuccess({ roomInfo: result });
      },
      onError: callbacks.onError,
    });
  }
}

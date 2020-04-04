import { Games } from 'src/features/main/domain/source/GamesDataSource';
import { CreateRoom } from "src/features/main/game/use_cases/base/CreateRoomUseCaseItf";

export class CreateRoomUseCase implements CreateRoom.UseCase {
  private repository: Games.DataSource;

  constructor(repository: Games.DataSource) {
    this.repository = repository;
  }

  execute(inputData: CreateRoom.InputData, callbacks: CreateRoom.Callbacks) {
    const {
      gameName,
      roomMode,
      roomPassword,
      roomTitle,
    } = inputData;

    this.repository.createRoom(gameName, roomPassword, roomTitle, roomMode, {
      onSuccess: (result) => {
        callbacks.onSuccess({ roomID: result });
      },
      onError: callbacks.onError,
    });
  }
}

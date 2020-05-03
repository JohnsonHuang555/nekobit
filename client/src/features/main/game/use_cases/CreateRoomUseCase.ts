import { Games } from 'src/features/main/domain/source/GamesDataSource';
import { CreateRoom } from "src/features/main/game/use_cases/base/CreateRoomUseCaseItf";

export class CreateRoomUseCase implements CreateRoom.UseCase {
  private repository: Games.DataSource;

  constructor(repository: Games.DataSource) {
    this.repository = repository;
  }

  execute(inputData: CreateRoom.InputData, callbacks: CreateRoom.Callbacks) {
    const {
      gameID,
      mode,
      password,
      title,
    } = inputData;
    this.repository.createRoom(gameID, password, title, mode, {
      onSuccess: (result) => {
        callbacks.onSuccess({ id: result });
      },
      onError: callbacks.onError
    })
  }
}

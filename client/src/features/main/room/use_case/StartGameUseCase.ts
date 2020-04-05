import { StartGame } from "./base/StartGameUseCaseItf";
import { Games } from "../../domain/source/GamesDataSource";

export class StartGameUseCase implements StartGame.UseCase {
  private repository: Games.DataSource;

  constructor(repository: Games.DataSource) {
    this.repository = repository;
  }

  execute(inputData: StartGame.InputData, callbacks: StartGame.Callbacks) {
    const {
      roomID,
      roomMode
    } = inputData;

    this.repository.startGame(roomID, roomMode, {
      onSuccess: (result) => {
        callbacks.onSuccess({ roomInfo: result });
      },
      onError: callbacks.onError,
    });
  }
}

import { ReadyGame } from "./base/ReadyGameUseCaseItf";
import { Games } from "../../domain/source/GamesDataSource";

export class ReadyGameUseCase implements ReadyGame.UseCase {
  private repository: Games.DataSource;

  constructor(repository: Games.DataSource) {
    this.repository = repository;
  }

  execute(inputData: ReadyGame.InputData, callbacks: ReadyGame.Callbacks) {
    const {
      roomID,
    } = inputData;

    this.repository.readyGame(roomID, {
      onSuccess: (result) => {
        callbacks.onSuccess({ roomUserList: result });
      },
      onError: callbacks.onError,
    });
  }
}

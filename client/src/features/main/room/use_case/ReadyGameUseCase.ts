import { ReadyGame } from "./base/ReadyGameUseCaseItf";
import { Games } from "../../domain/source/GamesDataSource";

export class ReadyGameUseCase implements ReadyGame.UseCase {
  private repository: Games.DataSource;

  constructor(repository: Games.DataSource) {
    this.repository = repository;
  }

  execute(inputData: ReadyGame.InputData) {
    const {
      roomID,
    } = inputData;

    this.repository.readyGame(roomID);
  }
}

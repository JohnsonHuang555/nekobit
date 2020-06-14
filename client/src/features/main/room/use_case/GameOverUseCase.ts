import { Games } from "../../domain/source/GamesDataSource";
import { GameOver } from "./base/GameOverUseCaseItf";

export class GameOverUseCase implements GameOver.UseCase {
  private repository: Games.DataSource;

  constructor(repository: Games.DataSource) {
    this.repository = repository;
  }

  execute(inputData: GameOver.InputData) {
    const {
      roomID,
    } = inputData;

    this.repository.gameOver(roomID);
  }
}

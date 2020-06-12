import { StartGame } from "./base/StartGameUseCaseItf";
import { Games } from "../../domain/source/GamesDataSource";

export class StartGameUseCase implements StartGame.UseCase {
  private repository: Games.DataSource;

  constructor(repository: Games.DataSource) {
    this.repository = repository;
  }

  execute(inputData: StartGame.InputData) {
    const {
      roomID,
      roomMode,
      gameID,
    } = inputData;

    this.repository.startGame(roomID, roomMode, gameID);
  }
}

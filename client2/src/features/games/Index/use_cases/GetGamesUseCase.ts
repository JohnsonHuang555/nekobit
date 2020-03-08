import { GetGames } from "src/features/games/Index/use_cases/base/GetGamesUseCaseItf";
import { Games } from "src/features/games/domain/source/GamesDataSource";
import { TGame } from "src/features/games/domain/models/Game";

export class GetGamesUseCase implements GetGames.UseCase {
  private repository: Games.DataSource;

  constructor(repository: Games.DataSource) {
    this.repository = repository;
  }

  execute(inputData: GetGames.InputData, callbacks: GetGames.Callbacks) {
    this.repository.getGames({
      onSuccess: (result: TGame[]) => {
        callbacks.onSuccess({ games: result });
      },
      onError: callbacks.onError,
    });
  }
}

import { UseCaseHandler } from "src/domain/usecases/base/UseCaseHandler";
import { Games } from "src/features/games/domain/source/GamesDataSource";
import appProvider from "src/provider/AppProvider";
import { GetGames } from "src/features/games/Index/use_cases/base/GetGamesUseCaseItf";
import { GetGamesUseCase } from "src/features/games/Index/use_cases/GetGamesUseCase";

export class Injection {
  static provideUseCaseHandler(): UseCaseHandler {
    return UseCaseHandler.INSTANCE;
  }

  static provideGamesRepository(): Games.DataSource {
    return appProvider.gamesRepository;
  }

  static provideGetGamesUseCase(): GetGames.UseCase {
    return new GetGamesUseCase(this.provideGamesRepository());
  }
}
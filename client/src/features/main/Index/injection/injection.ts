import { UseCaseHandler } from "src/domain/usecases/base/UseCaseHandler";
import { Games } from "src/features/main/domain/source/GamesDataSource";
import appProvider from "src/provider/AppProvider";
import { GetGames } from "src/features/main/Index/use_cases/base/GetGamesUseCaseItf";
import { GetGamesUseCase } from "src/features/main/Index/use_cases/GetGamesUseCase";

const provideGetGamesUseCase: GetGames.UseCase = () => {
  return new GetGamesUseCase();
}
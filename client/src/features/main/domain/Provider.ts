import { GetGames } from "../Index/use_cases/base/GetGamesUseCaseItf";
import { GetGamesUseCase } from "../Index/use_cases/GetGamesUseCase";
import appProvider from "src/provider/AppProvider";

export class MainProvider {
  static get GetGamesUseCase(): GetGames.UseCase {
    return new GetGamesUseCase(appProvider.fetcher);
  }
}

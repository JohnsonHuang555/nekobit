import { IndexContract } from "./IndexContract";
import { UseCaseHandler } from "src/domain/usecases/UseCaseHandler";
import { GetGames } from "./use_cases/base/GetGamesUseCaseItf";

export class IndexPresenter implements IndexContract.Presenter {
  private readonly view: IndexContract.View;
  private readonly useCaseHandler: UseCaseHandler;
  private readonly getGamesUseCase: GetGames.UseCase;

  constructor(
    view: IndexContract.View,
    useCaseHandler: UseCaseHandler,
    getGamesUseCase: GetGames.UseCase,
  ) {
    this.view = view;
    this.useCaseHandler = useCaseHandler;
    this.getGamesUseCase = getGamesUseCase;
  }

  mount(): void {
    this.getGames();
  }

  getGames(): void {
    this.view.nowLoading();
    this.useCaseHandler.execute(this.getGamesUseCase, {}, {
      onSuccess:(result) => {
        this.view.setGames(result.games);
      },
      onError:() => {
        this.view.finishLoading();
      }
    });
  }
}

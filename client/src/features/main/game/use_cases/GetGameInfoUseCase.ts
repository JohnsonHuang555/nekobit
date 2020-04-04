import { Games } from "src/features/main/domain/source/GamesDataSource";
import { TGame } from "src/features/main/domain/models/Game";
import { GetGameInfo } from "src/features/main/game/use_cases/base/GetGameInfoUseCaseItf";

export class GetGameInfoUseCase implements GetGameInfo.UseCase {
  private repository: Games.DataSource;

  constructor(repository: Games.DataSource) {
    this.repository = repository;
  }

  execute(inputData: GetGameInfo.InputData, callbacks: GetGameInfo.Callbacks) {
    const { id } = inputData;
    this.repository.getGameInfo(id, {
      onSuccess: (result: TGame) => {
        callbacks.onSuccess({ gameInfo: result });
      },
      onError: callbacks.onError,
    });
  }
}

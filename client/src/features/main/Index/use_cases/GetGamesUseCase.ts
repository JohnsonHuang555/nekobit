import { IFetcher } from 'src/api/Fetcher';
import { GetGames } from "src/features/main/Index/use_cases/base/GetGamesUseCaseItf";
import { GameFactory } from '../../domain/factories/GameFactory';

export class GetGamesUseCase implements GetGames.UseCase {
  private fetcher: IFetcher

  constructor(fetcher: IFetcher) {
    this.fetcher = fetcher;
  }

  execute(inputData: GetGames.InputData) {
    this.fetcher.get('/getAllGames', {
      onSuccess: (result) => {
        const games = GameFactory.createArrayFromNet(result);
        return games;
      },
      onError: e => e,
    });
  }
}

import appProvider from 'src/provider/AppProvider';
import { GetGamesUseCase } from 'src/features/main/index/use_cases/GetGamesUseCase';
import { Injection } from 'src/features/games/chinese_chess/injection/injection';

export const getGames = () => async (
) => {
  appProvider.useCaseHandler.execute(Injection.provideFlipChessUseCase, {}, {
  })
}

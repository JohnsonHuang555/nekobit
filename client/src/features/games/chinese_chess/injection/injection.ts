import { GetSocketMessage } from 'src/features/games/chinese_chess/use_cases/base/GetSocketMessageUseCaseItf';
import { UseCaseHandler } from "src/domain/usecases/base/UseCaseHandler";
import appProvider from "src/provider/AppProvider";
import { ChineseChess } from "../source/ChineseChessDataSource";
import { MoveOrEatChess } from "../use_cases/base/MoveOrEatChessUseCaseItf";
import { FlipChess } from "../use_cases/base/FlipChessUseCaseItf";
import { FlipChessUseCase } from "../use_cases/FlipChessUseCase";
import { GetSocketMessageUseCase } from '../use_cases/GetSocketMessageUseCase';
import { Games } from 'src/features/main/domain/source/GamesDataSource';
import { MoveOrEatChessUseCase } from '../use_cases/MoveOrEatChessUseCase';

export class Injection {
  static provideUseCaseHandler(): UseCaseHandler {
    return UseCaseHandler.INSTANCE;
  }

  static provideGamesRepository(): Games.DataSource {
    return appProvider.gamesRepository;
  }

  static provideChineseChessRepository(): ChineseChess.DataSource {
    return appProvider.chineseChessRepository;
  }

  static provideMoveOrEatChessUseCase(): MoveOrEatChess.UseCase {
    return new MoveOrEatChessUseCase(this.provideChineseChessRepository());
  }

  static provideFlipChessUseCase(): FlipChess.UseCase {
    return new FlipChessUseCase(this.provideChineseChessRepository());
  }

  // socket
  static provideGetSocketMessageUseCase(): GetSocketMessage.UseCase {
    return new GetSocketMessageUseCase(this.provideChineseChessRepository());
  }
}

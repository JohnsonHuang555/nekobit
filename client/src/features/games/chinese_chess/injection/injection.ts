import { GetSocketMessage } from 'src/features/games/chinese_chess/use_cases/base/GetSocketMessageUseCaseItf';
import { UseCaseHandler } from "src/domain/usecases/base/UseCaseHandler";
import appProvider from "src/provider/AppProvider";
import { ChineseChess } from "../source/ChineseChessDataSource";
import { MoveChess } from "../use_cases/base/MoveChessUseCaseItf";
import { MoveChessUseCase } from "../use_cases/MoveChessUseCase";
import { EatChess } from "../use_cases/base/EatChessUseCaseItf";
import { EatChessUseCase } from "../use_cases/EatChessUseCase";
import { FlipChess } from "../use_cases/base/FlipChessUseCaseItf";
import { FlipChessUseCase } from "../use_cases/FlipChessUseCase";
import { GetSocketMessageUseCase } from '../use_cases/GetSocketMessageUseCase';

export class Injection {
  static provideUseCaseHandler(): UseCaseHandler {
    return UseCaseHandler.INSTANCE;
  }

  static provideChineseChessRepository(): ChineseChess.DataSource {
    return appProvider.chineseChessRepository;
  }

  static provideMoveChessUseCase(): MoveChess.UseCase {
    return new MoveChessUseCase(this.provideChineseChessRepository());
  }

  static provideEatChessUseCase(): EatChess.UseCase {
    return new EatChessUseCase(this.provideChineseChessRepository());
  }

  static provideFlipChessUseCase(): FlipChess.UseCase {
    return new FlipChessUseCase(this.provideChineseChessRepository());
  }

  // socket
  static provideGetSocketMessageUseCase(): GetSocketMessage.UseCase {
    return new GetSocketMessageUseCase(this.provideChineseChessRepository());
  }
}

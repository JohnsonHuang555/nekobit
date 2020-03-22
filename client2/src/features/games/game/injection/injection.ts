import { UseCaseHandler } from "src/domain/usecases/base/UseCaseHandler";
import { Games } from "src/features/games/domain/source/GamesDataSource";
import appProvider from "src/provider/AppProvider";
import { GetGameInfo } from "src/features/games/game/use_cases/base/GetGameInfoUseCaseItf";
import { GetGameInfoUseCase } from "src/features/games/game/use_cases/GetGameInfoUseCase";
import { GetRoomsUseCase } from "../use_cases/GetRoomsUseCase";
import { App } from "src/domain/source/AppDataSource";
import { GetRooms } from "../use_cases/base/GetRoomsUseCaseItf";
import { GetSocketMessage } from "src/domain/usecases/base/GetMessageUseCaseItf";
import { GetSocketMessageUseCase } from "src/domain/usecases/GetSocketMessageUseCase";
import { CreateSocket } from "src/domain/usecases/base/CreateSocketUseCaseItf";
import { CreateSocketUseCase } from "src/domain/usecases/CreateSocketUseCase";

export class Injection {
  static provideUseCaseHandler(): UseCaseHandler {
    return UseCaseHandler.INSTANCE;
  }

  static provideAppRepository(): App.DataSource {
    return appProvider.appRepository;
  }

  static provideGamesRepository(): Games.DataSource {
    return appProvider.gamesRepository;
  }

  static provideGetRoomsUseCase(): GetRooms.UseCase {
    return new GetRoomsUseCase(this.provideAppRepository());
  }

  static provideGetGameInfoUseCase(): GetGameInfo.UseCase {
    return new GetGameInfoUseCase(this.provideGamesRepository());
  }

  static provideCreateSocketUseCase(): CreateSocket.UseCase {
    return new CreateSocketUseCase(this.provideAppRepository());
  }

  static provideGetSocketMessageUseCase(): GetSocketMessage.UseCase {
    return new GetSocketMessageUseCase(this.provideAppRepository());
  }
}
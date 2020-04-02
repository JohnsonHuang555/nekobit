import { UseCaseHandler } from "src/domain/usecases/base/UseCaseHandler";
import { Games } from "src/features/main/domain/source/GamesDataSource";
import appProvider from "src/provider/AppProvider";
import { GetGameInfo } from "src/features/main/game/use_cases/base/GetGameInfoUseCaseItf";
import { GetGameInfoUseCase } from "src/features/main/game/use_cases/GetGameInfoUseCase";
import { GetRoomsUseCase } from "../use_cases/GetRoomsUseCase";
import { App } from "src/domain/source/AppDataSource";
import { GetRooms } from "../use_cases/base/GetRoomsUseCaseItf";
import { CreateSocket } from "src/domain/usecases/base/CreateSocketUseCaseItf";
import { CreateSocketUseCase } from "src/domain/usecases/CreateSocketUseCase";
import { CreateRoom } from "../use_cases/base/CreateRoomUseCaseItf";
import { CreateRoomUseCase } from "../use_cases/CreateRoomUseCase";

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

  static provideGetGameInfoUseCase(): GetGameInfo.UseCase {
    return new GetGameInfoUseCase(this.provideGamesRepository());
  }

  // socket
  static provideGetRoomsUseCase(): GetRooms.UseCase {
    return new GetRoomsUseCase(this.provideAppRepository());
  }

  static provideCreateSocketUseCase(): CreateSocket.UseCase {
    return new CreateSocketUseCase(this.provideAppRepository());
  }

  static provideCreateRoomUseCase(): CreateRoom.UseCase {
    return new CreateRoomUseCase(this.provideAppRepository());
  }
}
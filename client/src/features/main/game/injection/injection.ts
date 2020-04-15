import { UseCaseHandler } from "src/domain/usecases/base/UseCaseHandler";
import { Games } from "src/features/main/domain/source/GamesDataSource";
import appProvider from "src/provider/AppProvider";
import { GetGameInfo } from "src/features/main/game/use_cases/base/GetGameInfoUseCaseItf";
import { GetGameInfoUseCase } from "src/features/main/game/use_cases/GetGameInfoUseCase";
import { GetRoomsUseCase } from "../use_cases/GetRoomsUseCase";
import { GetRooms } from "../use_cases/base/GetRoomsUseCaseItf";
import { CreateRoom } from "../use_cases/base/CreateRoomUseCaseItf";
import { CreateRoomUseCase } from "../use_cases/CreateRoomUseCase";
import { ConnectSocket } from "../use_cases/base/ConnectSocketUseCaseItf";
import { ConnectSocketUseCase } from "../use_cases/ConnectSocketUseCase";
import { GetSocketMessage } from "../use_cases/base/GetSocketMessageUseCaseItf";
import { GetSocketMessageUseCase } from "../use_cases/GetSocketMessageUseCase";

export class Injection {
  static provideUseCaseHandler(): UseCaseHandler {
    return UseCaseHandler.INSTANCE;
  }

  static provideGamesRepository(): Games.DataSource {
    return appProvider.gamesRepository;
  }

  static provideGetGameInfoUseCase(): GetGameInfo.UseCase {
    return new GetGameInfoUseCase(this.provideGamesRepository());
  }

  // socket
  static provideGetRoomsUseCase(): GetRooms.UseCase {
    return new GetRoomsUseCase(this.provideGamesRepository());
  }

  static provideConnectSocketUseCase(): ConnectSocket.UseCase {
    return new ConnectSocketUseCase(this.provideGamesRepository());
  }

  static provideCreateRoomUseCase(): CreateRoom.UseCase {
    return new CreateRoomUseCase(this.provideGamesRepository());
  }

  static provideGetSocketMessageUseCase(): GetSocketMessage.UseCase {
    return new GetSocketMessageUseCase(this.provideGamesRepository());
  }
}
import { UseCaseHandler } from "src/domain/usecases/base/UseCaseHandler";
import { Games } from "../../domain/source/GamesDataSource";
import appProvider from "src/provider/AppProvider";
import { JoinRoom } from "../use_case/base/JoinRoomUseCaseItf";
import { JoinRoomUseCase } from "../use_case/JoinRoomUseCase";
import { LeaveRoom } from "../use_case/base/LeaveRoomUseCaseItf";
import { LeaveRoomUseCase } from "../use_case/LeaveRoomUseCase";
import { ReadyGame } from "../use_case/base/ReadyGameUseCaseItf";
import { ReadyGameUseCase } from "../use_case/ReadyGameUseCase";
import { StartGame } from "../use_case/base/StartGameUseCaseItf";
import { StartGameUseCase } from "../use_case/StartGameUseCase";
import { ConnectSocket } from "../../game/use_cases/base/ConnectSocketUseCaseItf";
import { ConnectSocketUseCase } from "../../game/use_cases/ConnectSocketUseCase";
import { GetUserInfo } from "../use_case/base/GetUserInfoUseCaseItf";
import { GetUserInfoUseCase } from "../use_case/GetUserInfoUseCase";

export class Injection {
  static provideUseCaseHandler(): UseCaseHandler {
    return UseCaseHandler.INSTANCE;
  }

  static provideGamesRepository(): Games.DataSource {
    return appProvider.gamesRepository;
  }

  static provideConnectSocketUseCase(): ConnectSocket.UseCase {
    return new ConnectSocketUseCase(this.provideGamesRepository());
  }

  static provideJoinRoomUseCase(): JoinRoom.UseCase {
    return new JoinRoomUseCase(this.provideGamesRepository());
  }

  static provideLeaveRoomUseCase(): LeaveRoom.UseCase {
    return new LeaveRoomUseCase(this.provideGamesRepository());
  }

  static provideReadyGameUseCase(): ReadyGame.UseCase {
    return new ReadyGameUseCase(this.provideGamesRepository());
  }

  static provideStartGameUseCase(): StartGame.UseCase {
    return new StartGameUseCase(this.provideGamesRepository());
  }

  static provideGetUserInfoUseCase(): GetUserInfo.UseCase {
    return new GetUserInfoUseCase(this.provideGamesRepository());
  }
}
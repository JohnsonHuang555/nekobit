import { GameContract } from "src/features/games/game/GameContract";
import { UseCaseHandler } from "src/domain/usecases/base/UseCaseHandler";
import { GetGameInfo } from "src/features/games/game/use_cases/base/GetGameInfoUseCaseItf";
import { GetSocketMessage } from "src/domain/usecases/base/GetMessageUseCaseItf";
import { CreateSocket } from "src/domain/usecases/base/CreateSocketUseCaseItf";
import { GetRooms } from "./use_cases/base/GetRoomsUseCaseItf";

const SOCKET_PATH = 'game_page';

export class GamePresenter implements GameContract.Presenter {
  private readonly view: GameContract.View;
  private readonly useCaseHandler: UseCaseHandler;
  private readonly createSocketUseCase: CreateSocket.UseCase;
  private readonly getSocketMessageUseCase: GetSocketMessage.UseCase;
  private readonly getGameInfoUseCase: GetGameInfo.UseCase;
  private readonly getRoomsUseCase: GetRooms.UseCase;

  constructor(
    view: GameContract.View,
    useCaseHandler: UseCaseHandler,
    createSocketUseCase: CreateSocket.UseCase,
    getSocketMessageUseCase: GetSocketMessage.UseCase,
    getGameInfoUseCase: GetGameInfo.UseCase,
    getRoomsUseCase: GetRooms.UseCase,
  ) {
    this.view = view;
    this.useCaseHandler = useCaseHandler;
    this.createSocketUseCase = createSocketUseCase;
    this.getSocketMessageUseCase = getSocketMessageUseCase;
    this.getGameInfoUseCase = getGameInfoUseCase;
    this.getRoomsUseCase = getRoomsUseCase;
  }

  mount(params: GameContract.GamePageParams): void {
    const { id } = params;
    console.log(params)

    this.getGameInfo(id);
    this.createSocket(SOCKET_PATH);
  }

  getGameInfo(id: string): void {
    this.view.nowLoading();
    this.useCaseHandler.execute(this.getGameInfoUseCase, { id }, {
      onSuccess: (result) => {
        this.view.setGameInfo(result.gameInfo);
        this.view.finishLoading();
      },
      onError: () => {
        this.view.finishLoading();
      }
    });
  }

  getRooms(): void {
    this.view.nowLoading();
    this.useCaseHandler.execute(this.getRoomsUseCase, {}, {
      onSuccess: (result) => {
        this.view.setRooms(result.rooms);
        this.view.finishLoading();
      },
      onError: () => {
        this.view.finishLoading();
      }
    });
  }

  private createSocket(path: string): void {
    this.view.nowLoading();
    this.useCaseHandler.execute(this.createSocketUseCase, { path }, {
      onSuccess: () => {
        this.getRooms();
        this.getSocketMessage();
      },
      onError: () => {
        this.view.finishLoading();
      }
    })
  }

  private getSocketMessage(): void {
    this.view.nowLoading();
    this.useCaseHandler.execute(this.getSocketMessageUseCase, {}, {
      onSuccess: (result) => {
        console.log(result.socketData, 'ddddd');
        this.view.finishLoading();
      },
      onError:() => {
        this.view.finishLoading();
      }
    });
  }
}
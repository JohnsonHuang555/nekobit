import { GameContract } from "src/features/main/game/GameContract";
import { UseCaseHandler } from "src/domain/usecases/base/UseCaseHandler";
import { GetGameInfo } from "src/features/main/game/use_cases/base/GetGameInfoUseCaseItf";
import { GetRooms } from "src/features/main/game/use_cases/base/GetRoomsUseCaseItf";
import { CreateRoom } from "src/features/main/game/use_cases/base/CreateRoomUseCaseItf";
import { ConnectSocket } from "src/features/main/game/use_cases/base/ConnectSocketUseCaseItf";
import { GetSocketMessage } from "src/features/main/game/use_cases/base/GetSocketMessageUseCaseItf";

const SOCKET_PATH = 'game_page';

export class GamePresenter implements GameContract.Presenter {
  private readonly view: GameContract.View;
  private readonly useCaseHandler: UseCaseHandler;
  private readonly connectSocketUseCase: ConnectSocket.UseCase;
  private readonly getSocketMessageUseCase: GetSocketMessage.UseCase;
  private readonly getGameInfoUseCase: GetGameInfo.UseCase;
  private readonly getRoomsUseCase: GetRooms.UseCase;
  private readonly createRoomUseCase: CreateRoom.UseCase;

  constructor(
    view: GameContract.View,
    useCaseHandler: UseCaseHandler,
    connectSocketUseCase: ConnectSocket.UseCase,
    getSocketMessageUseCase: GetSocketMessage.UseCase,
    getGameInfoUseCase: GetGameInfo.UseCase,
    getRoomsUseCase: GetRooms.UseCase,
    createRoomUseCase: CreateRoom.UseCase,
  ) {
    this.view = view;
    this.useCaseHandler = useCaseHandler;
    this.connectSocketUseCase = connectSocketUseCase;
    this.getSocketMessageUseCase = getSocketMessageUseCase;
    this.getGameInfoUseCase = getGameInfoUseCase;
    this.getRoomsUseCase = getRoomsUseCase;
    this.createRoomUseCase = createRoomUseCase;
  }

  mount(params: GameContract.GamePageParams): void {
    const { id } = params;
    this.getGameInfo(id);
    this.connectSocket(SOCKET_PATH);
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
    this.useCaseHandler.execute(this.getRoomsUseCase, {});
  }

  createRoom(
    gameID: string,
    mode: number,
    password: string,
    title: string): void {
    this.view.nowLoading();
    this.useCaseHandler.execute(this.createRoomUseCase,
      {
        gameID,
        mode,
        password,
        title,
      },
      {
        onSuccess: (result) => {
          this.getRooms();
          this.view.setRoomID(result.id);
          this.view.finishLoading();
        },
        onError: () => {
          this.view.finishLoading();
        }
      }
    )
  }

  getMessageHandler(): void {
    this.useCaseHandler.execute(this.getSocketMessageUseCase, {}, {
      onSuccess: (result) => {
        if (result.rooms) {
          this.view.setRooms(result.rooms);
        }
      },
      onError: () => {
        // error toast
      }
    });
  }

  private connectSocket(path: string): void {
    this.view.nowLoading();
    this.useCaseHandler.execute(this.connectSocketUseCase, { path }, {
      onSuccess: () => {
        this.view.setToastShow(
          true,
          'Connect successfully',
        );
        this.getMessageHandler();
        this.getRooms();
      },
      onError: () => {
        this.view.finishLoading();
      }
    })
  }
}
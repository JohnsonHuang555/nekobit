import { GameContract } from "src/features/main/game/GameContract";
import { UseCaseHandler } from "src/domain/usecases/base/UseCaseHandler";
import { GetGameInfo } from "src/features/main/game/use_cases/base/GetGameInfoUseCaseItf";
import { GetRooms } from "src/features/main/game/use_cases/base/GetRoomsUseCaseItf";
import { CreateRoom } from "src/features/main/game/use_cases/base/CreateRoomUseCaseItf";
import { ConnectSocket } from "./use_cases/base/ConnectSocketUseCaseItf";

const SOCKET_PATH = 'game_page';

export class GamePresenter implements GameContract.Presenter {
  private readonly view: GameContract.View;
  private readonly useCaseHandler: UseCaseHandler;
  private readonly connectSocketUseCase: ConnectSocket.UseCase;
  private readonly getGameInfoUseCase: GetGameInfo.UseCase;
  private readonly getRoomsUseCase: GetRooms.UseCase;
  private readonly createRoomUseCase: CreateRoom.UseCase;

  constructor(
    view: GameContract.View,
    useCaseHandler: UseCaseHandler,
    connectSocketUseCase: ConnectSocket.UseCase,
    getGameInfoUseCase: GetGameInfo.UseCase,
    getRoomsUseCase: GetRooms.UseCase,
    createRoomUseCase: CreateRoom.UseCase,
  ) {
    this.view = view;
    this.useCaseHandler = useCaseHandler;
    this.connectSocketUseCase = connectSocketUseCase;
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

  createRoom(
    gameName: string,
    roomMode: number,
    roomPassword: string,
    roomTitle: string): void {
    this.view.nowLoading();
    this.useCaseHandler.execute(this.createRoomUseCase,
      {
        gameName,
        roomMode,
        roomTitle,
        roomPassword,
      },
      {
        onSuccess: (result) => {
          this.view.setRoomID(result.roomID);
          this.view.finishLoading();
        },
        onError: () => {
          this.view.finishLoading();
        }
      });
  }

  private connectSocket(path: string): void {
    this.view.nowLoading();
    this.useCaseHandler.execute(this.connectSocketUseCase, { path }, {
      onSuccess: () => {
        // TODO: Toast Message
        console.log('connected successfully...')
        this.getRooms();
      },
      onError: () => {
        this.view.finishLoading();
      }
    })
  }
}
import { GameContract } from "src/features/games/game/GameContract";
import { UseCaseHandler } from "src/domain/usecases/base/UseCaseHandler";
import { GetGameInfo } from "src/features/games/game/use_cases/base/GetGameInfoUseCaseItf";
import { CreateSocket } from "src/domain/usecases/base/CreateSocketUseCaseItf";
import { GetRooms } from "src/features/games/game/use_cases/base/GetRoomsUseCaseItf";
import { TUser } from "src/types/Account";
import { CreateRoom } from "./use_cases/base/CreateRoomUseCaseItf";

const SOCKET_PATH = 'game_page';

export class GamePresenter implements GameContract.Presenter {
  private readonly view: GameContract.View;
  private readonly useCaseHandler: UseCaseHandler;
  private readonly createSocketUseCase: CreateSocket.UseCase;
  private readonly getGameInfoUseCase: GetGameInfo.UseCase;
  private readonly getRoomsUseCase: GetRooms.UseCase;
  private readonly createRoomUseCase: CreateRoom.UseCase;

  private userInfo: TUser | null = null;

  constructor(
    view: GameContract.View,
    useCaseHandler: UseCaseHandler,
    createSocketUseCase: CreateSocket.UseCase,
    getGameInfoUseCase: GetGameInfo.UseCase,
    getRoomsUseCase: GetRooms.UseCase,
    createRoomUseCase: CreateRoom.UseCase,
  ) {
    this.view = view;
    this.useCaseHandler = useCaseHandler;
    this.createSocketUseCase = createSocketUseCase;
    this.getGameInfoUseCase = getGameInfoUseCase;
    this.getRoomsUseCase = getRoomsUseCase;
    this.createRoomUseCase = createRoomUseCase;
  }

  mount(params: GameContract.GamePageParams): void {
    const { id, userInfo } = params;
    this.userInfo = userInfo;
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

  createRoom(
    gameName: string,
    roomMode: number,
    roomPassword: string,
    roomTitle: string): void {
    if (!this.userInfo) { return; }
    this.view.nowLoading();
    this.useCaseHandler.execute(this.createRoomUseCase,
      {
        gameName,
        roomMode,
        roomTitle,
        roomPassword,
        name: this.userInfo.name,
        userID: this.userInfo.id,
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

  private createSocket(path: string): void {
    this.view.nowLoading();
    this.useCaseHandler.execute(this.createSocketUseCase, { path }, {
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
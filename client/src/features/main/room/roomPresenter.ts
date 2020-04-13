import { UseCaseHandler } from '../../../domain/usecases/base/UseCaseHandler';
import { RoomContract } from "./roomContract";
import { ConnectSocket } from '../game/use_cases/base/ConnectSocketUseCaseItf';
import { JoinRoom } from './use_case/base/JoinRoomUseCaseItf';
import { LeaveRoom } from './use_case/base/LeaveRoomUseCaseItf';
import { ReadyGame } from './use_case/base/ReadyGameUseCaseItf';
import { StartGame } from './use_case/base/StartGameUseCaseItf';
import { TRoom } from '../domain/models/Room';
import { GetUserInfo } from './use_case/base/GetUserInfoUseCaseItf';
import { GetSocketMessage } from './use_case/base/GetSocketMessageUseCaseItf';

export class RoomPresenter implements RoomContract.Presenter {
  private readonly view: RoomContract.View;
  private readonly useCaseHandler: UseCaseHandler;
  private readonly connectSocketUseCase: ConnectSocket.UseCase;
  private readonly getSocketMessageUseCase: GetSocketMessage.UseCase;
  private readonly joinRoomUseCase: JoinRoom.UseCase;
  private readonly leaveRoomUseCase: LeaveRoom.UseCase;
  private readonly readyGameUseCase: ReadyGame.UseCase;
  private readonly startGameUseCase: StartGame.UseCase;
  private readonly getUserInfoUseCase: GetUserInfo.UseCase;

  private roomID: number = 0;
  private roomInfo: TRoom | null = null;

  constructor(
    view: RoomContract.View,
    useCaseHandler: UseCaseHandler,
    connectSocketUseCase: ConnectSocket.UseCase,
    getSocketMessageUseCase: GetSocketMessage.UseCase,
    joinRoomUseCase: JoinRoom.UseCase,
    leaveRoomUseCase: LeaveRoom.UseCase,
    readyGameUseCase: ReadyGame.UseCase,
    startGameUseCase: StartGame.UseCase,
    getUserInfoUseCase: GetUserInfo.UseCase,
  ) {
    this.view = view;
    this.useCaseHandler = useCaseHandler;
    this.connectSocketUseCase = connectSocketUseCase;
    this.getSocketMessageUseCase = getSocketMessageUseCase;
    this.joinRoomUseCase = joinRoomUseCase;
    this.leaveRoomUseCase = leaveRoomUseCase;
    this.readyGameUseCase = readyGameUseCase;
    this.startGameUseCase = startGameUseCase;
    this.getUserInfoUseCase = getUserInfoUseCase;
  }

  mount(params: RoomContract.RoomPageParams): void {
    const { id } = params;
    this.roomID = Number(id);
    this.connectSocket(id);
    this.getUserInfo();
  }

  getUserInfo(): void {
    this.view.nowLoading();
    this.useCaseHandler.execute(this.getUserInfoUseCase, {}, {
      onSuccess: (result) => {
        this.view.setUserInfo(result.userInfo);
      },
      onError: () => {
        this.view.finishLoading();
      }
    });
  }

  joinRoom(): void {
    this.view.nowLoading();
    this.useCaseHandler.execute(this.joinRoomUseCase, { roomID: this.roomID });
  }

  leaveRoom(): void {
    this.view.nowLoading();
    this.useCaseHandler.execute(this.leaveRoomUseCase, { roomID: this.roomID });
  }

  readyGame(): void {
    this.view.nowLoading();
    this.useCaseHandler.execute(this.readyGameUseCase, { roomID: this.roomID });
  }

  startGame(mode: number): void {
    this.view.nowLoading();
    this.useCaseHandler.execute(this.startGameUseCase,
      {
        roomID: this.roomID,
        roomMode: mode,
      }
    );
  }

  getMessageHandler(): void {
    this.useCaseHandler.execute(this.getSocketMessageUseCase, { roomInfo: this.roomInfo }, {
      onSuccess: (result) => {
        if (result.roomInfo) {
          this.view.setRoomInfo(result.roomInfo);
        }
      },
      onError: () => {
        // error toast
      }
    });
  }

  private connectSocket(id: string): void {
    this.view.nowLoading();
    this.useCaseHandler.execute(this.connectSocketUseCase, { path: id }, {
      onSuccess: () => {
        // TODO: Toast Message
        console.log('connected successfully...');
        this.getMessageHandler();
        this.joinRoom();
      },
      onError: () => {
        this.view.finishLoading();
      }
    })
  }
}

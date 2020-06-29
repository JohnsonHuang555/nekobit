import { UseCaseHandler } from '../../../domain/usecases/base/UseCaseHandler';
import { RoomContract } from "./roomContract";
import { ConnectSocket } from '../game/use_cases/base/ConnectSocketUseCaseItf';
import { JoinRoom } from './use_case/base/JoinRoomUseCaseItf';
import { LeaveRoom } from './use_case/base/LeaveRoomUseCaseItf';
import { ReadyGame } from './use_case/base/ReadyGameUseCaseItf';
import { StartGame } from './use_case/base/StartGameUseCaseItf';
import { GetUserInfo } from './use_case/base/GetUserInfoUseCaseItf';
import { GetSocketMessage } from './use_case/base/GetSocketMessageUseCaseItf';
import { SetPlayOrder } from './use_case/base/SetPlayOrderUseCaseItf';
import { GameOver } from './use_case/base/GameOverUseCaseItf';
import { TUser } from '../domain/models/User';
import { ChangePassword } from './use_case/base/ChangePasswordUseCaseItf';

export class RoomPresenter implements RoomContract.Presenter {
  private readonly view: RoomContract.View;
  private readonly useCaseHandler: UseCaseHandler;
  private readonly connectSocketUseCase: ConnectSocket.UseCase;
  private readonly getSocketMessageUseCase: GetSocketMessage.UseCase;
  private readonly joinRoomUseCase: JoinRoom.UseCase;
  private readonly leaveRoomUseCase: LeaveRoom.UseCase;
  private readonly readyGameUseCase: ReadyGame.UseCase;
  private readonly setPlayOrderUseCase: SetPlayOrder.UseCase;
  private readonly startGameUseCase: StartGame.UseCase;
  private readonly getUserInfoUseCase: GetUserInfo.UseCase;
  private readonly gameOverUseCase: GameOver.UseCase;
  private readonly changePasswordUseCase: ChangePassword.UseCase;

  private roomID = '';
  private userInfo: TUser | undefined;

  constructor(
    view: RoomContract.View,
    useCaseHandler: UseCaseHandler,
    connectSocketUseCase: ConnectSocket.UseCase,
    getSocketMessageUseCase: GetSocketMessage.UseCase,
    joinRoomUseCase: JoinRoom.UseCase,
    leaveRoomUseCase: LeaveRoom.UseCase,
    readyGameUseCase: ReadyGame.UseCase,
    startGameUseCase: StartGame.UseCase,
    setPlayOrderUseCase: SetPlayOrder.UseCase,
    getUserInfoUseCase: GetUserInfo.UseCase,
    gameOverUseCase: GameOver.UseCase,
    changePasswordUseCase: ChangePassword.UseCase,
  ) {
    this.view = view;
    this.useCaseHandler = useCaseHandler;
    this.connectSocketUseCase = connectSocketUseCase;
    this.getSocketMessageUseCase = getSocketMessageUseCase;
    this.joinRoomUseCase = joinRoomUseCase;
    this.leaveRoomUseCase = leaveRoomUseCase;
    this.readyGameUseCase = readyGameUseCase;
    this.startGameUseCase = startGameUseCase;
    this.setPlayOrderUseCase = setPlayOrderUseCase;
    this.getUserInfoUseCase = getUserInfoUseCase;
    this.gameOverUseCase = gameOverUseCase;
    this.changePasswordUseCase = changePasswordUseCase;
  }

  mount(params: RoomContract.RoomPageParams): void {
    const { id } = params;
    this.roomID = id;
    this.connectSocket(id);
    this.getUserInfo();
  }

  getUserInfo(): void {
    this.view.nowLoading();
    this.useCaseHandler.execute(this.getUserInfoUseCase, {}, {
      onSuccess: (result) => {
        this.userInfo = result.userInfo;
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

  leaveRoom(userID: string): void {
    this.view.nowLoading();
    this.useCaseHandler.execute(this.leaveRoomUseCase, {
      userID,
      roomID: this.roomID,
    });
  }

  readyGame(): void {
    this.view.nowLoading();
    this.useCaseHandler.execute(this.readyGameUseCase, { roomID: this.roomID });
  }

  setPlayOrder(): void {
    this.useCaseHandler.execute(this.setPlayOrderUseCase, {
      roomID: this.roomID
    });
  }

  startGame(mode: number, gameId: string): void {
    this.view.nowLoading();
    this.useCaseHandler.execute(this.startGameUseCase,
      {
        roomID: this.roomID,
        gameID: gameId,
        roomMode: mode,
      }
    );
  }

  gameOver(): void {
    this.view.nowLoading();
    this.useCaseHandler.execute(this.gameOverUseCase,
      {
        roomID: this.roomID,
      }
    );
  }

  changePassword(password: string): void {
    this.view.nowLoading();
    this.useCaseHandler.execute(this.changePasswordUseCase, {
      roomID: this.roomID,
      password,
    })
  }

  getMessageHandler(): void {
    this.useCaseHandler.execute(this.getSocketMessageUseCase, {}, {
      onSuccess: (result) => {
        if (result.roomInfo) {
          const user = result.roomInfo.userList.find(u => u.id === this.userInfo?.id);
          if (user) {
            this.view.setRoomInfo(result.roomInfo);
          } else {
            this.view.redirectToGamePage();
          }
        }
        this.view.finishLoading();
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

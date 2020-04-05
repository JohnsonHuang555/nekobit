import { UseCaseHandler } from '../../../domain/usecases/base/UseCaseHandler';
import { RoomContract } from "./roomContract";
import { ConnectSocket } from '../game/use_cases/base/ConnectSocketUseCaseItf';
import { JoinRoom } from './use_case/base/JoinRoomUseCaseItf';
import { LeaveRoom } from './use_case/base/LeaveRoomUseCaseItf';
import { ReadyGame } from './use_case/base/ReadyGameUseCaseItf';
import { StartGame } from './use_case/base/StartGameUseCaseItf';
import { TRoom } from '../domain/models/Room';

export class RoomPresenter implements RoomContract.Presenter {
  private readonly view: RoomContract.View;
  private readonly useCaseHandler: UseCaseHandler;
  private readonly connectSocketUseCase: ConnectSocket.UseCase;
  private readonly joinRoomUseCase: JoinRoom.UseCase;
  private readonly leaveRoomUseCase: LeaveRoom.UseCase;
  private readonly readyGameUseCase: ReadyGame.UseCase;
  private readonly startGameUseCase: StartGame.UseCase;

  private roomID: number = 0;
  private roomInfo: TRoom | null = null;

  constructor(
    view: RoomContract.View,
    useCaseHandler: UseCaseHandler,
    connectSocketUseCase: ConnectSocket.UseCase,
    joinRoomUseCase: JoinRoom.UseCase,
    leaveRoomUseCase: LeaveRoom.UseCase,
    readyGameUseCase: ReadyGame.UseCase,
    startGameUseCase: StartGame.UseCase,
  ) {
    this.view = view;
    this.useCaseHandler = useCaseHandler;
    this.connectSocketUseCase = connectSocketUseCase;
    this.joinRoomUseCase = joinRoomUseCase;
    this.leaveRoomUseCase = leaveRoomUseCase;
    this.readyGameUseCase = readyGameUseCase;
    this.startGameUseCase = startGameUseCase;
  }

  mount(params: RoomContract.RoomPageParams): void {
    const { id } = params;
    this.roomID = Number(id);
    this.connectSocket(id);
  }

  joinRoom(): void {
    this.view.nowLoading();
    this.useCaseHandler.execute(this.joinRoomUseCase, { roomID: this.roomID }, {
      onSuccess: (result) => {
        this.roomInfo = result.roomInfo;
        this.view.setRoomInfo(result.roomInfo);
      },
      onError: (e) => {
        this.view.finishLoading();
      }
    });
  }

  leaveRoom(): void {
    this.view.nowLoading();
    this.useCaseHandler.execute(this.leaveRoomUseCase, { roomID: this.roomID }, {
      onSuccess: (result) => {
        this.roomInfo = result.roomInfo;
        this.view.setRoomInfo(result.roomInfo);
      },
      onError: () => {
        this.view.finishLoading();
      }
    });
  }

  readyGame(): void {
    this.view.nowLoading();
    this.useCaseHandler.execute(this.readyGameUseCase, { roomID: this.roomID }, {
      onSuccess: (result) => {
        if (this.roomInfo) {
          this.roomInfo.userList = result.roomUserList;
          this.view.setRoomInfo(this.roomInfo);
        }
      },
      onError: () => {
        this.view.finishLoading();
      }
    });
  }

  startGame(mode: number): void {
    this.view.nowLoading();
    this.useCaseHandler.execute(this.startGameUseCase,
      {
        roomID: this.roomID,
        roomMode: mode,
      },
      {
        onSuccess: (result) => {
          this.roomInfo = result.roomInfo;
          this.view.setRoomInfo(result.roomInfo);
        },
        onError: () => {
          this.view.finishLoading();
        }
      }
    );
  }

  private connectSocket(id: string): void {
    this.view.nowLoading();
    this.useCaseHandler.execute(this.connectSocketUseCase, { path: id }, {
      onSuccess: () => {
        // TODO: Toast Message
        console.log('connected successfully...');
        this.joinRoom();
      },
      onError: () => {
        this.view.finishLoading();
      }
    })
  }
}

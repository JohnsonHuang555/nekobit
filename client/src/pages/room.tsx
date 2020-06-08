import React from 'react';
import { faPen, faDoorOpen } from '@fortawesome/free-solid-svg-icons';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import Layout from "src/components/Layout";
import RoomUser from 'src/features/main/room/components/RoomUser';
import { RoomContract } from 'src/features/main/room/roomContract';
import { TRoom, TRoomUser } from 'src/features/main/domain/models/Room';
import { RoomPresenter } from 'src/features/main/room/roomPresenter';
import { Injection } from 'src/features/main/room/injection/injection';
import GameScreen from 'src/features/main/room/components/GameScreen';
import { TUser } from 'src/types/Account';
import { Button } from '@material-ui/core';
import '@styles/pages/room.scss';

interface RoomViewProps {}
interface RoomViewState {
  roomInfo?: TRoom;
  userInfo?: TUser;
}

class RoomView extends React.Component<RoomViewProps, RoomViewState>
  implements RoomContract.View {

  private presenter: RoomContract.Presenter;

  constructor(props: RoomViewProps) {
    super(props);
    this.state = {
      roomInfo: undefined,
      userInfo: undefined,
    }

    this.presenter = new RoomPresenter(
      this,
      Injection.provideUseCaseHandler(),
      Injection.provideConnectSocketUseCase(),
      Injection.provideGetSocketMessageUseCase(),
      Injection.provideJoinRoomUseCase(),
      Injection.provideLeaveRoomUseCase(),
      Injection.provideReadyGameUseCase(),
      Injection.provideStartGameUseCase(),
      Injection.provideSetPlayOrderUseCase(),
      Injection.provideGetUserInfoUseCase(),
    )
  }

  componentDidMount() {
    const id = location.search.substr(4);
    this.presenter.mount({ id });
  }

  render() {
    const {
      roomInfo,
      userInfo,
    } = this.state;

    return (
      <Layout id="room-page">
        <div className="row">
          <div className="col-md-8">
            <div className="user-block">
              <div className="header">
                {roomInfo && (
                  <div className="title">
                    <span>{roomInfo.roomNumber}.</span>
                    <span>{roomInfo.title}</span>
                  </div>
                )}
                <span className="icons">
                  <FontAwesomeIcon icon={faPen}/>
                  <FontAwesomeIcon icon={faDoorOpen}/>
                </span>
              </div>
              <div className="content">
                {roomInfo && roomInfo.userList.map((user: TRoomUser) => (
                  <RoomUser key={user.id} user={user}/>
                ))}
              </div>
            </div>
            <div className="chat-block"></div>
          </div>
          <div className="col-md-4">
            <div className="settings-block"></div>
            {roomInfo &&
              this.isMaster ? (
                <Button
                  className="start"
                  onClick={() => this.startGame(roomInfo.mode, roomInfo.gameId)}
                  disabled={this.disabledStart}
                >
                  Start
                </Button>
              ) : (
                <Button
                  className="ready"
                  onClick={() => this.readyGame()}
                >
                  {this.isPlayerReady}
                </Button>
              )
            }
          </div>
          {roomInfo && roomInfo.status === 1 && userInfo && (
            <GameScreen
              roomInfo={roomInfo}
              userID={userInfo.id}
              isMaster={this.isMaster}
              playerSide={this.playerSide}
              onSetPlayOrder={() => this.onSetPlayOrder()}
              updateRoomInfo={(rf) => this.setRoomInfo(rf)}
            />
          )}
        </div>
      </Layout>
    )
  }

  nowLoading(): void {
  }

  finishLoading(): void {
  }

  setRoomInfo(roomInfo: TRoom): void {
    this.setState({ roomInfo });
  }

  setUserInfo(userInfo: TUser): void {
    this.setState({ userInfo });
  }

  private get isMaster(): boolean {
    const user = this.findUser;
    if (user && user.isMaster) {
      return true;
    }
    return false;
  }

  private get isPlayerReady(): string {
    const user = this.findUser;
    if (user && user.isReady) {
      return 'Cancel';
    }
    return 'Ready';
  }

  private get disabledStart(): boolean {
    const user = this.findUser;
    if (user && user.isReady) {
      return true;
    }
    return false;
  }

  private get playerSide(): string {
    const user = this.findUser;
    if (user) {
      return user.side
    }
    return '';
  }

  private startGame(mode: number, gameId: string): void {
    this.presenter.startGame(mode, gameId);
  }

  private readyGame(): void {
    this.presenter.readyGame();
  }

  private onSetPlayOrder(): void {
    this.presenter.setPlayOrder();
  }

  private get findUser(): TRoomUser | undefined {
    const {
      roomInfo,
      userInfo,
    } = this.state;

    return roomInfo?.userList.find(u => {
      return u.id === userInfo?.id
    });
  }
}

export default RoomView;

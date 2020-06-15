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
import { Button, Modal, Fade, Backdrop } from '@material-ui/core';
import '@styles/pages/room.scss';
import { TUser } from 'src/features/main/domain/models/User';
import { ChessSide } from 'src/features/games/domain/models/ChineseChess';

interface RoomViewProps {}
interface RoomViewState {
  roomInfo?: TRoom;
  userInfo?: TUser;
  showGameOverModal: boolean;
  isYouWin: boolean;
}

class RoomView extends React.Component<RoomViewProps, RoomViewState>
  implements RoomContract.View {

  private presenter: RoomContract.Presenter;

  constructor(props: RoomViewProps) {
    super(props);
    this.state = {
      roomInfo: undefined,
      userInfo: undefined,
      showGameOverModal: false,
      isYouWin: false,
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
      Injection.provideGameOverUseCase(),
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
      showGameOverModal,
      isYouWin,
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
              playerSide={this.playerSide as ChessSide}
              onSetPlayOrder={() => this.onSetPlayOrder()}
              updateRoomInfo={(rf) => this.setRoomInfo(rf)}
              onGameOver={(iyw) => this.onGameOver(iyw)}
            />
          )}
        </div>
        <Modal
          aria-labelledby="transition-modal-title"
          aria-describedby="transition-modal-description"
          className="game-over-modal"
          open={showGameOverModal}
          onClose={() => this.updateGameOverStatus()}
          closeAfterTransition
          BackdropComponent={Backdrop}
          BackdropProps={{
            timeout: 500,
          }}
        >
          <Fade in={showGameOverModal}>
            <div className="content">
              <span>{isYouWin ? '你贏了' : '你輸了'}</span>
            </div>
          </Fade>
        </Modal>
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
    const {
      roomInfo,
    } = this.state;

    const notReady = roomInfo?.userList.filter(u => !u.isReady) || [];
    if (notReady.length) {
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

  private onGameOver(isYouWin: boolean): void {
    this.setState({ isYouWin, showGameOverModal: true });
  }

  private updateGameOverStatus(): void {
    this.presenter.gameOver();
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

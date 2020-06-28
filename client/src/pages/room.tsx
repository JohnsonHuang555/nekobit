import React from 'react';
import Router from 'next/router';
import { faPen, faDoorOpen } from '@fortawesome/free-solid-svg-icons';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import Layout from "src/components/Layout";
import RoomUser from 'src/features/main/game/components/RoomUser';
import { RoomContract } from 'src/features/main/room/roomContract';
import { TRoom, TRoomUser } from 'src/features/main/domain/models/Room';
import { RoomPresenter } from 'src/features/main/room/roomPresenter';
import { Injection } from 'src/features/main/room/injection/injection';
import GameScreen from 'src/features/main/room/components/GameScreen';
import { Button, Modal, Fade, Backdrop, Dialog, DialogActions, DialogContent, DialogContentText, DialogTitle } from '@material-ui/core';
import { TUser } from 'src/features/main/domain/models/User';
import { ChessSide } from 'src/features/games/domain/models/ChineseChess';
import '@styles/pages/room.scss';

interface RoomViewProps {}
interface RoomViewState {
  roomInfo?: TRoom;
  userInfo?: TUser;
  showGameOverModal: boolean;
  showLeaveRoomModal: boolean;
  isYouWin: boolean;
}

class RoomView extends React.Component<RoomViewProps, RoomViewState>
  implements RoomContract.View {

  private presenter: RoomContract.Presenter;

  constructor(props: RoomViewProps) {
    super(props);
    this.state = {
      showGameOverModal: false,
      isYouWin: false,
      showLeaveRoomModal: false,
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
      showLeaveRoomModal,
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
                  <FontAwesomeIcon
                    icon={faDoorOpen}
                    onClick={() => this.setShowLeaveRoomModal(true)}
                  />
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
          className="gp-modal"
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
        <Dialog
          fullWidth
          open={showLeaveRoomModal}
          onClose={() => this.setShowLeaveRoomModal(false)}
        >
          <DialogTitle id="leave-room-modal">提示</DialogTitle>
          <DialogContent>
            <DialogContentText>
              確定要離開房間?
            </DialogContentText>
          </DialogContent>
          <DialogActions>
            <Button
              onClick={() => this.setShowLeaveRoomModal(false)}
              color="primary"
            >
              Cancel
            </Button>
            <Button
              onClick={() => this.onLeaveRoom()}
              color="primary"
            >
              Leave
            </Button>
          </DialogActions>
        </Dialog>
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

  private onLeaveRoom(): void {
    if (this.state.roomInfo) {
      this.presenter.leaveRoom();
      Router.push({
        pathname: '/game',
        query: { id: this.state.roomInfo.gameId }
      });
    }
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

  private setShowLeaveRoomModal(show: boolean): void {
    this.setState({ showLeaveRoomModal: show });
  }
}

export default RoomView;

import React, { useEffect, useState } from 'react';
import Router from 'next/router';
import { faPen, faDoorOpen, faEdit } from '@fortawesome/free-solid-svg-icons';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import Layout from "src/components/Layout";
import { TRoom, TRoomUser } from 'src/features/main/domain/models/Room';
import { RoomPresenter } from 'src/features/main/room/roomPresenter';
import { Injection } from 'src/features/main/room/injection/injection';
import GameScreen from 'src/features/main/room/components/GameScreen';
import { Button, Modal, Fade, Backdrop, Dialog, DialogActions, DialogContent, DialogContentText, DialogTitle, Box, TextField, Grid } from '@material-ui/core';
import { TUser } from 'src/features/main/domain/models/User';
import { ChessSide } from 'src/features/games/domain/models/ChineseChess';
import { useSelector, useDispatch } from 'react-redux';
import { websocketSelector, userInfoSelector } from 'src/selectors';
import { ActionType as AppActionType } from 'src/reducers/appReducer';
import { ActionType as RoomActionType } from 'src/features/main/reducers/roomReducer';
import { SocketEvent, TSocket } from 'src/types/Socket';
import { RoomFactory } from 'src/features/main/domain/factories/RoomFactory';
import UserList from 'src/features/main/room/components/UserList';
import { UserFactory } from 'src/features/main/domain/factories/UserFactory';
import Chat from 'src/components/Chat';
import GameSettings from 'src/features/main/room/components/GameSettings';
import {
  roomInfoSelector,
  isYouMasterSelector,
  isPlayerReadySelector,
  playerSideSelector
} from 'src/features/main/selectors';

const RoomContainer = () => {
  const dispatch = useDispatch();
  const ws = useSelector(websocketSelector);
  const userInfo = useSelector(userInfoSelector);
  const roomInfo = useSelector(roomInfoSelector);
  const isYouMaster = useSelector(isYouMasterSelector);
  const isPlayerReady = useSelector(isPlayerReadySelector);
  const playerSide = useSelector(playerSideSelector);

  const [showEditModal, setShowEditModal] = useState(false);
  const [showLeaveRoomModal, setShowLeaveRoomModal] = useState(false);
  const [editingPassword, setEditingPassword] = useState('');

  // component did mount
  useEffect(() => {
    const id = location.search.substr(4);
    dispatch({ type: AppActionType.GET_USER_INFO });
    dispatch({
      type: AppActionType.CREATE_SOCKET,
      domain: id,
    });

    return () => {
      dispatch({ type: AppActionType.CLOSE_SOCKET });
    }
  }, []);

  useEffect(() => {
    if (ws && userInfo) {
      let gameId = '';
      ws.onopen = () => {
        dispatch({
          type: AppActionType.SET_SHOW_TOAST,
          show: true,
          message: 'Join room',
        });
        dispatch({
          type: AppActionType.SEND_MESSAGE,
          event: SocketEvent.JoinRoom,
          data: {
            userName: userInfo.name,
          }
        });
      };
      ws.onmessage = (webSocket: MessageEvent) => {
        const wsData: TSocket = JSON.parse(webSocket.data);
        switch (wsData.event) {
          case SocketEvent.JoinRoom: {
            const roomInfo = RoomFactory.createFromNet(wsData.data.roomInfo);
            setEditingPassword(roomInfo.password);
            dispatch({
              type: RoomActionType.INITIAL_ROOM_INFO,
              roomInfo,
            });
            gameId = roomInfo.gameId;
            break;
          }
          case SocketEvent.LeaveRoom:
          case SocketEvent.ReadyGame:{
            const roomUserList = UserFactory.createArrayFromNet(wsData.data.roomUserList);
            const user = roomUserList.find(u => u.id === userInfo.id);
            if (user) {
              dispatch({
                type: RoomActionType.UPDATE_ROOM_INFO,
                roomInfo: {
                  userList: roomUserList,
                },
              });
            } else {
              Router.push({
                pathname: '/game',
                query: { id: gameId }
              });
            }
            break;
          }
          case SocketEvent.StartGame:
          case SocketEvent.ChangePassword:
          case SocketEvent.SetPlayOrder: {
            const roomInfo = RoomFactory.createFromNet(wsData.data.roomInfo);
            dispatch({
              type: RoomActionType.UPDATE_ROOM_INFO,
              roomInfo,
            });
          }
        }
      };
    }
  }, [ws, userInfo]);

  if (!roomInfo) { return null; }

  // methods
  const kickOutPlayer = (id: string) => {
    dispatch({
      type: AppActionType.SEND_MESSAGE,
      userId: id,
      event: SocketEvent.LeaveRoom,
    });
  };

  const disabledStart = (): boolean => {
    const notReady = roomInfo.userList.filter(u => !u.isReady) || [];
    if (notReady.length) {
      return true;
    }
    return false;
  }

  const onLeaveRoom = () => {
    dispatch({
      type: AppActionType.SEND_MESSAGE,
      event: SocketEvent.LeaveRoom,
    });
  };

  const changePassword = () => {
    dispatch({
      type: AppActionType.SEND_MESSAGE,
      event: SocketEvent.ChangePassword,
      data: {
        roomPassword: editingPassword,
      }
    })
    setShowEditModal(false);
  };

  // const gameOver = (isWin: boolean) => {

  // };

  return (
    <Layout>
      <div className="section-heading">
        <h2>{roomInfo.roomNumber}.{roomInfo.title}</h2>
        <Box marginBottom={1} display="flex">
          <Box marginRight={1}>
            <Button
              variant="contained"
              color="primary"
              startIcon={
                <FontAwesomeIcon icon={faEdit}/>
              }
              onClick={() => setShowEditModal(true)}
            >
              編輯
            </Button>
          </Box>
          <Button
            variant="contained"
            color="secondary"
            startIcon={
              <FontAwesomeIcon icon={faDoorOpen}/>
            }
            onClick={() => setShowLeaveRoomModal(true)}
          >
            離開
          </Button>
        </Box>
      </div>
      <Grid container spacing={3}>
        <Grid item xs={8}>
          <UserList
            isYouMaster={isYouMaster}
            userList={roomInfo.userList}
            onKickOutPlayer={(id) => kickOutPlayer(id)}
          />
          <Box className="block">
            <Chat
              onSubmit={() => {}}
            />
          </Box>
        </Grid>
        <Grid item xs={4}>
          <Box className="block">
            <GameSettings />
          </Box>
          {isYouMaster ? (
            <Button
              variant="contained"
              color="primary"
              fullWidth
              size="large"
              onClick={() => dispatch({
                type: AppActionType.SEND_MESSAGE,
                event: SocketEvent.StartGame,
                data: {
                  gameID: roomInfo.gameId,
                  roomMode: roomInfo.mode,
                }
              })}
              disabled={disabledStart()}
            >
              Start
            </Button>
          ) : (
            <Button
              variant="contained"
              color="primary"
              fullWidth
              size="large"
              onClick={() => dispatch({
                type: AppActionType.SEND_MESSAGE,
                event: SocketEvent.ReadyGame,
              })}
            >
              {isPlayerReady}
            </Button>
          )}
        </Grid>
      </Grid>
      {roomInfo.status === 1 && userInfo && (
        <GameScreen
          roomInfo={roomInfo}
          userID={userInfo.id}
          isYouMaster={isYouMaster}
          playerSide={playerSide}
          onSetPlayOrder={() => dispatch({
            type: AppActionType.SEND_MESSAGE,
            event: SocketEvent.SetPlayOrder,
          })}
          onGameOver={(iyw) => {}}
        />
      )}
      <Dialog
        fullWidth
        open={showLeaveRoomModal}
        onClose={() => setShowLeaveRoomModal(false)}
      >
        <DialogTitle id="leave-room-modal">提示</DialogTitle>
        <DialogContent>
          <DialogContentText>
            確定要離開房間?
          </DialogContentText>
        </DialogContent>
        <DialogActions>
          <Button
            onClick={() => setShowLeaveRoomModal(false)}
            color="primary"
          >
            Cancel
          </Button>
          <Button
            onClick={() => onLeaveRoom()}
            color="primary"
          >
            Leave
          </Button>
        </DialogActions>
      </Dialog>
      <Dialog
        fullWidth
        open={showEditModal}
        onClose={() => setShowEditModal(false)}
      >
        <DialogTitle id="leave-room-modal">請輸入房間密碼</DialogTitle>
        <DialogContent>
          <Box marginBottom={3}>
            <TextField
              required
              fullWidth
              margin="dense"
              label="房間密碼"
              placeholder="請輸入房間密碼"
              variant="outlined"
              value={editingPassword}
              onChange={(e) => setEditingPassword(e.target.value)}
            />
          </Box>
        </DialogContent>
        <DialogActions>
          <Button
            onClick={() => setShowEditModal(false)}
            color="primary"
          >
            Cancel
          </Button>
          <Button
            onClick={() => changePassword()}
            color="primary"
          >
            Save
          </Button>
        </DialogActions>
      </Dialog>
    </Layout>
  )
};

export default RoomContainer;
// interface RoomViewProps {}
// interface RoomViewState {
//   roomInfo?: TRoom;
//   userInfo?: TUser;
//   showGameOverModal: boolean;
//   showLeaveRoomModal: boolean;
//   showEditModal: boolean;
//   roomPassword: string;
//   isYouWin: boolean;
// }

// class RoomView extends React.Component<RoomViewProps, RoomViewState>
//   implements RoomContract.View {

//   private presenter: RoomContract.Presenter;

//   constructor(props: RoomViewProps) {
//     super(props);
//     this.state = {
//       showGameOverModal: false,
//       isYouWin: false,
//       showLeaveRoomModal: false,
//       showEditModal: false,
//       roomPassword: '',
//     }

//     this.presenter = new RoomPresenter(
//       this,
//       Injection.provideUseCaseHandler(),
//       Injection.provideConnectSocketUseCase(),
//       Injection.provideGetSocketMessageUseCase(),
//       Injection.provideJoinRoomUseCase(),
//       Injection.provideLeaveRoomUseCase(),
//       Injection.provideReadyGameUseCase(),
//       Injection.provideStartGameUseCase(),
//       Injection.provideSetPlayOrderUseCase(),
//       Injection.provideGetUserInfoUseCase(),
//       Injection.provideGameOverUseCase(),
//       Injection.provideChangePasswordUseCase(),
//     )
//   }

//   componentDidMount() {
//     const id = location.search.substr(4);
//     this.presenter.mount({ id });
//   }

//   render() {
//     const {
//       roomInfo,
//       userInfo,
//       showGameOverModal,
//       showLeaveRoomModal,
//       showEditModal,
//       isYouWin,
//       roomPassword,
//     } = this.state;

//     return (
//       <Layout id="room-page">
//         <div className="row">
//           <div className="col-md-8">
//             <div className="user-block">
//               <div className="header">
//                 {roomInfo && (
//                   <div className="title">
//                     <span>{roomInfo.roomNumber}.</span>
//                     <span>{roomInfo.title}</span>
//                   </div>
//                 )}
//                 <span className="icons">
//                   <FontAwesomeIcon
//                     icon={faPen}
//                     onClick={() => this.setShowEditModal(true)}
//                   />
//                   <FontAwesomeIcon
//                     icon={faDoorOpen}
//                     onClick={() => this.setShowLeaveRoomModal(true)}
//                   />
//                 </span>
//               </div>
//               <div className="content">
//                 {roomInfo && roomInfo.userList.map((user: TRoomUser) => (
//                   <RoomUser
//                     key={user.id}
//                     user={user}
//                     isMaster={this.isMaster}
//                     onKickOutPlayer={(id) => this.onKickOutPlayer(id)}
//                   />
//                 ))}
//               </div>
//             </div>
//             <div className="chat-block"></div>
//           </div>
//           <div className="col-md-4">
//             <div className="settings-block"></div>
//             {roomInfo &&
//               this.isMaster ? (
//                 <Button
//                   className="start"
//                   onClick={() => this.startGame(roomInfo.mode, roomInfo.gameId)}
//                   disabled={this.disabledStart}
//                 >
//                   Start
//                 </Button>
//               ) : (
//                 <Button
//                   className="ready"
//                   onClick={() => this.readyGame()}
//                 >
//                   {this.isPlayerReady}
//                 </Button>
//               )
//             }
//           </div>
//           {roomInfo && roomInfo.status === 1 && userInfo && (
//             <GameScreen
//               roomInfo={roomInfo}
//               userID={userInfo.id}
//               isMaster={this.isMaster}
//               playerSide={this.playerSide as ChessSide}
//               onSetPlayOrder={() => this.onSetPlayOrder()}
//               updateRoomInfo={(rf) => this.setRoomInfo(rf)}
//               onGameOver={(iyw) => this.onGameOver(iyw)}
//             />
//           )}
//         </div>
//         <Modal
//           aria-labelledby="transition-modal-title"
//           aria-describedby="transition-modal-description"
//           className="gp-modal"
//           open={showGameOverModal}
//           onClose={() => this.updateGameOverStatus()}
//           closeAfterTransition
//           BackdropComponent={Backdrop}
//           BackdropProps={{
//             timeout: 500,
//           }}
//         >
//           <Fade in={showGameOverModal}>
//             <div className="content">
//               <span>{isYouWin ? '你贏了' : '你輸了'}</span>
//             </div>
//           </Fade>
//         </Modal>
//         <Dialog
//           fullWidth
//           open={showLeaveRoomModal}
//           onClose={() => this.setShowLeaveRoomModal(false)}
//         >
//           <DialogTitle id="leave-room-modal">提示</DialogTitle>
//           <DialogContent>
//             <DialogContentText>
//               確定要離開房間?
//             </DialogContentText>
//           </DialogContent>
//           <DialogActions>
//             <Button
//               onClick={() => this.setShowLeaveRoomModal(false)}
//               color="primary"
//             >
//               Cancel
//             </Button>
//             <Button
//               onClick={() => this.onLeaveRoom()}
//               color="primary"
//             >
//               Leave
//             </Button>
//           </DialogActions>
//         </Dialog>
//         <Dialog
//           fullWidth
//           open={showEditModal}
//           onClose={() => this.setShowEditModal(false)}
//         >
//           <DialogTitle id="leave-room-modal">請輸入房間密碼</DialogTitle>
//           <DialogContent>
//             <Box marginBottom={3}>
//               <TextField
//                 required
//                 fullWidth
//                 margin="dense"
//                 label="房間密碼"
//                 placeholder="請輸入房間密碼"
//                 variant="outlined"
//                 value={roomPassword}
//                 onChange={(e) => this.setRoomPassword(e.target.value)}
//               />
//             </Box>
//           </DialogContent>
//           <DialogActions>
//             <Button
//               onClick={() => this.setShowEditModal(false)}
//               color="primary"
//             >
//               Cancel
//             </Button>
//             <Button
//               onClick={() => this.changePassword()}
//               color="primary"
//             >
//               Save
//             </Button>
//           </DialogActions>
//         </Dialog>
//       </Layout>
//     )
//   }

//   nowLoading(): void {
//   }

//   finishLoading(): void {
//   }

//   setRoomInfo(roomInfo: TRoom): void {
//     this.setState({ roomInfo });
//   }

//   setUserInfo(userInfo: TUser): void {
//     this.setState({ userInfo });
//   }

//   redirectToGamePage(): void {
//     if (!this.state.roomInfo) { return; }
//     Router.push({
//       pathname: '/game',
//       query: { id: this.state.roomInfo.gameId }
//     });
//   }

//   private get isMaster(): boolean {
//     const user = this.findUser;
//     if (user && user.isMaster) {
//       return true;
//     }
//     return false;
//   }

//   private get isPlayerReady(): string {
//     const user = this.findUser;
//     if (user && user.isReady) {
//       return 'Cancel';
//     }
//     return 'Ready';
//   }

//   private get disabledStart(): boolean {
//     const {
//       roomInfo,
//     } = this.state;

//     const notReady = roomInfo?.userList.filter(u => !u.isReady) || [];
//     if (notReady.length) {
//       return true;
//     }
//     return false;
//   }

//   private get playerSide(): string {
//     const user = this.findUser;
//     if (user) {
//       return user.side
//     }
//     return '';
//   }

//   private startGame(mode: number, gameId: string): void {
//     this.presenter.startGame(mode, gameId);
//   }

//   private readyGame(): void {
//     this.presenter.readyGame();
//   }

//   private onSetPlayOrder(): void {
//     this.presenter.setPlayOrder();
//   }

//   private onGameOver(isYouWin: boolean): void {
//     this.setState({ isYouWin, showGameOverModal: true });
//   }

//   private updateGameOverStatus(): void {
//     this.presenter.gameOver();
//   }

//   private onLeaveRoom(): void {
//     const {
//       roomInfo,
//       userInfo,
//     } = this.state;
//     if (roomInfo && userInfo) {
//       this.presenter.leaveRoom(userInfo.id);
//       Router.push({
//         pathname: '/game',
//         query: { id: roomInfo.gameId }
//       });
//     }
//   }

//   private get findUser(): TRoomUser | undefined {
//     const {
//       roomInfo,
//       userInfo,
//     } = this.state;

//     return roomInfo?.userList.find(u => {
//       return u.id === userInfo?.id
//     });
//   }

//   private setShowLeaveRoomModal(show: boolean): void {
//     this.setState({ showLeaveRoomModal: show });
//   }

//   private setShowEditModal(show: boolean): void {
//     this.setState({ showEditModal: show });
//   }

//   private onKickOutPlayer(userID: string): void {
//     this.presenter.leaveRoom(userID);
//   }

//   private setRoomPassword(password: string): void {
//     this.setState({ roomPassword: password });
//   }

//   private changePassword(): void {
//     this.presenter.changePassword(this.state.roomPassword);
//     this.setShowEditModal(false);
//   }
// }

// export default RoomView;

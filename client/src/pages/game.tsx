import React, { useEffect } from 'react';
import Router from 'next/router';
import Layout from 'src/components/Layout';
import RoomList from 'src/features/main/game/components/RoomList';
import GameDetail from 'src/features/main/game/components/GameDetail';
import { GameContract } from 'src/features/main/game/GameContract';
import { GamePresenter } from 'src/features/main/game/GamePresenter';
import { Injection } from 'src/features/main/game/injection/injection';
import { TGame, GameMode } from 'src/features/main/domain/models/Game';
import { TRoom } from 'src/features/main/domain/models/Room';
import {
  Box,
  TextField,
  MenuItem,
  Button,
  Dialog,
  DialogTitle,
  DialogContent,
  DialogActions,
  Snackbar,
  IconButton
} from '@material-ui/core';
import CloseIcon from '@material-ui/icons/Close';
import '@styles/pages/game.scss';
import { useDispatch, useSelector } from 'react-redux';
import { gameInfoSelector } from 'src/features/main/selectors';
import { ActionType } from 'src/features/main/reducers/gameReducer';

const GameContainer = () => {
  const dispatch = useDispatch();
  const gameInfo = useSelector(gameInfoSelector);

  useEffect(() => {
    dispatch({
      type: ActionType.GET_GAME_INFO
    });
  }, [input])
};

export default GameContainer;

// interface GameViewProps {}
// interface GameViewState {
//   gameInfo?: TGame;
//   userInfo: any;
//   ws?: WebSocket;
//   rooms: TRoom[];
//   roomId: string;

//   isShowRoomList: boolean;
//   isOnCreateRoom: boolean;
//   isShowCreateRoomModal: boolean;
//   isShowEnterPasswordModal: boolean;

//   isShowToast: boolean;
//   toastMessage: string;

//   gameID: string;
//   createRoomMode: string;
//   createRoomPassword: string;
//   createRoomTitle: string;

//   enterRoomPassword: string;
// }

// class GameView extends React.Component<GameViewProps, GameViewState>
//   implements GameContract.View {

//   private presenter: GameContract.Presenter;

//   constructor(props: GameViewProps) {
//     super(props);
//     this.state = {
//       userInfo: null,
//       rooms: [],
//       roomId: '',
//       isShowRoomList: false,
//       isOnCreateRoom: false,
//       isShowCreateRoomModal: false,
//       isShowEnterPasswordModal: false,
//       isShowToast: false,
//       toastMessage: '',
//       gameID: '',

//       createRoomMode: '',
//       createRoomPassword: '',
//       createRoomTitle: '',

//       enterRoomPassword: '',
//     }

//     this.presenter = new GamePresenter(
//       this,
//       Injection.provideUseCaseHandler(),
//       Injection.provideConnectSocketUseCase(),
//       Injection.provideGetSocketMessageUseCase(),
//       Injection.provideGetGameInfoUseCase(),
//       Injection.provideGetRoomsUseCase(),
//       Injection.provideCreateRoomUseCase(),
//     )
//   }

//   componentDidMount() {
//     const id = location.search.substr(4);
//     this.setState({ gameID: id })
//     this.presenter.mount({ id });
//   }

//   render() {
//     const {
//       rooms,
//       gameInfo,
//       roomId,
//       createRoomMode,
//       isShowToast,
//       isShowRoomList,
//       isShowCreateRoomModal,
//       isShowEnterPasswordModal,
//     } = this.state;
//     return (
//       <Layout>
//         <Dialog
//           fullWidth
//           open={isShowCreateRoomModal}
//           onClose={() => this.setIsShowCreateRoomModal(false)}
//           aria-labelledby="create-room-modal"
//         >
//           <DialogTitle id="create-room-modal">創建房間</DialogTitle>
//           <DialogContent>
//             <Box marginBottom={2}>
//               <TextField
//                 required
//                 fullWidth
//                 label="房間名稱"
//                 placeholder="請輸入房間名稱"
//                 variant="outlined"
//                 onChange={(e) => this.setRoomTitle(e.target.value)}
//               />
//             </Box>
//             <Box marginBottom={2}>
//               <TextField
//                 required
//                 fullWidth
//                 label="房間密碼"
//                 placeholder="請輸入房間密碼"
//                 type="password"
//                 variant="outlined"
//                 onChange={(e) => this.setRoomPassword(e.target.value)}
//               />
//             </Box>
//             <Box marginBottom={2}>
//               {gameInfo && (
//                 <TextField
//                   fullWidth
//                   select
//                   label="遊戲模式"
//                   value={createRoomMode}
//                   onChange={(e) => this.onChangeGameMode(String(e.target.value))}
//                   variant="outlined"
//                 >
//                   {GameMode[gameInfo.id].map((m, i) => (
//                     <MenuItem key={i} value={m.value}>
//                       {m.label}
//                     </MenuItem >
//                   ))}
//                 </TextField>
//               )}
//             </Box>
//           </DialogContent>
//           <DialogActions>
//             <Button
//               onClick={() => this.setIsShowCreateRoomModal(false)}
//               color="primary"
//             >
//               Cancel
//             </Button>
//             <Button
//               onClick={() => this.createRoom()}
//               color="primary"
//             >
//               Create
//             </Button>
//           </DialogActions>
//         </Dialog>
//         <Dialog
//           open={isShowEnterPasswordModal}
//           onClose={() => this.setIsShowEnterPasswordModal(false)}
//         >
//           <DialogTitle id="enter-password">請輸入房間密碼</DialogTitle>
//           <DialogContent>
//             <Box marginBottom={3}>
//               <TextField
//                 required
//                 fullWidth
//                 margin="dense"
//                 label="房間密碼"
//                 placeholder="請輸入房間密碼"
//                 type="password"
//                 variant="outlined"
//                 onChange={(e) => this.setEnterRoomPassword(e.target.value)}
//               />
//             </Box>
//           </DialogContent>
//           <DialogActions>
//             <Button onClick={() => this.setIsShowEnterPasswordModal(false)} color="primary">
//               Cancel
//             </Button>
//             <Button onClick={() => this.onChooseRoom(roomId)} color="primary">
//               Submit
//             </Button>
//           </DialogActions>
//         </Dialog>
//         <Box>
//           {gameInfo && isShowRoomList ? (
//             <RoomList
//               rooms={rooms}
//               gameId={gameInfo.id}
//               maxPlayers={gameInfo.maxPlayers}
//               onChooseRoom={(id) => this.onChooseRoom(id)}
//             />
//           ): (
//             gameInfo &&
//               <GameDetail
//                 gameInfo={gameInfo}
//                 roomsCount={rooms.length}
//                 onShowModal={() => this.setIsShowCreateRoomModal(true)}
//                 playNow={() => this.setIsShowRoomList(true)}
//               />
//           )}
//         </Box>
//         <Snackbar
//           anchorOrigin={{
//             vertical: 'bottom',
//             horizontal: 'right',
//           }}
//           open={isShowToast}
//           autoHideDuration={4000}
//           onClose={() => this.setToastShow(false)}
//           message={this.state.toastMessage}
//           action={
//             <React.Fragment>
//               <IconButton
//                 size="small"
//                 aria-label="close"
//                 color="inherit"
//                 onClick={() => this.setToastShow(false)}
//               >
//                 <CloseIcon fontSize="small" />
//               </IconButton>
//             </React.Fragment>
//           }
//         />
//       </Layout>
//     );
//   }

//   nowLoading(): void {}

//   finishLoading(): void {}

//   setGameInfo(gameInfo: TGame): void {
//     this.setState({ gameInfo });
//   }

//   setRooms(rooms: TRoom[]): void {
//     this.setState({ rooms });
//   }

//   setRoomID(id: string): void {
//     if (id) {
//       Router.push({
//         pathname: '/room',
//         query: { id }
//       });
//     }
//   }

//   setIsShowEnterPasswordModal(show: boolean): void {
//     this.setState({ isShowEnterPasswordModal: show, enterRoomPassword: '' });
//   }

//   setToastShow(show: boolean, msg?: string): void {
//     if (msg) {
//       this.setState({ toastMessage: msg });
//     }
//     this.setState({ isShowToast: show });
//   }

//   private setRoomTitle(title: string): void {
//     this.setState({ createRoomTitle: title });
//   }

//   private setRoomPassword(password: string): void {
//     this.setState({ createRoomPassword: password });
//   }

//   private setEnterRoomPassword(password: string): void {
//     this.setState({ enterRoomPassword: password });
//   }

//   private onChangeGameMode(createRoomMode: string): void {
//     this.setState({ createRoomMode });
//   }

//   private onChooseRoom(roomId: string): void {
//     this.setState({ roomId });
//     this.presenter.enterRoom(roomId, this.state.enterRoomPassword);
//   }

//   private createRoom(): void {
//     const gameID = this.state.gameID || '';
//     this.presenter.createRoom(
//       gameID,
//       Number(this.state.createRoomMode),
//       this.state.createRoomPassword,
//       this.state.createRoomTitle
//     );
//     this.presenter.getRooms();
//   }

//   private setIsShowCreateRoomModal(show: boolean): void {
//     this.setState({ isShowCreateRoomModal: show });
//   }

//   private setIsShowRoomList(show: boolean): void {
//     this.setState({ isShowRoomList: show });
//   }
// }

// export default GameView;

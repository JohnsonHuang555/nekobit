import React from 'react';
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

interface GameViewProps {}
interface GameViewState {
  gameInfo?: TGame;
  userInfo: any;
  ws?: WebSocket;
  rooms: TRoom[];
  roomId: string;

  isShowRoomList: boolean;
  isOnCreateRoom: boolean;
  isShowCreateRoomModal: boolean;

  isShowToast: boolean;
  toastMessage: string;

  gameID: string;
  createRoomMode: string;
  createRoomPassword: string;
  createRoomTitle: string;
}

class GameView extends React.Component<GameViewProps, GameViewState>
  implements GameContract.View {

  private presenter: GameContract.Presenter;

  constructor(props: GameViewProps) {
    super(props);
    this.state = {
      userInfo: null,
      rooms: [],
      roomId: '',
      isShowRoomList: false,
      isOnCreateRoom: false,
      isShowCreateRoomModal: false,
      isShowToast: false,
      toastMessage: '',
      gameID: '',
      createRoomMode: '',
      createRoomPassword: '',
      createRoomTitle: '',
    }

    this.presenter = new GamePresenter(
      this,
      Injection.provideUseCaseHandler(),
      Injection.provideConnectSocketUseCase(),
      Injection.provideGetSocketMessageUseCase(),
      Injection.provideGetGameInfoUseCase(),
      Injection.provideGetRoomsUseCase(),
      Injection.provideCreateRoomUseCase(),
    )
  }

  componentDidMount() {
    const id = location.search.substr(4);
    this.setState({ gameID: id })
    this.presenter.mount({ id });
  }

  render() {
    const {
      rooms,
      gameInfo,
      createRoomMode,
      isShowToast,
      isShowRoomList,
      isShowCreateRoomModal,
    } = this.state;
    return (
      <Layout>
        <Dialog
          fullWidth
          open={isShowCreateRoomModal}
          onClose={() => this.setIsShowCreateRoomModal(false)}
          aria-labelledby="create-room-modal"
        >
          <DialogTitle id="create-room-modal">創建房間</DialogTitle>
          <DialogContent>
            <Box marginBottom={2}>
              <TextField
                required
                fullWidth
                id="standard-required"
                label="房間名稱"
                placeholder="請輸入房間名稱"
                variant="outlined"
                onChange={(e) => this.setRoomTitle(e.target.value)}
              />
            </Box>
            <Box marginBottom={2}>
              <TextField
                required
                fullWidth
                id="standard-required"
                label="房間密碼"
                placeholder="請輸入房間密碼"
                type="password"
                variant="outlined"
                onChange={(e) => this.setRoomPassword(e.target.value)}
              />
            </Box>
            <Box marginBottom={2}>
              {gameInfo && (
                <TextField
                  fullWidth
                  select
                  label="遊戲模式"
                  value={createRoomMode}
                  onChange={(e) => this.onChangeGameMode(String(e.target.value))}
                  variant="outlined"
                >
                  {GameMode[gameInfo.id].map((m, i) => (
                    <MenuItem key={i} value={m.value}>
                      {m.label}
                    </MenuItem >
                  ))}
                </TextField>
              )}
            </Box>
          </DialogContent>
          <DialogActions>
            <Button
              onClick={() => this.setIsShowCreateRoomModal(false)}
              color="primary"
            >
              Cancel
            </Button>
            <Button
              onClick={() => this.createRoom()}
              color="primary"
            >
              Create
            </Button>
          </DialogActions>
        </Dialog>
        <Box>
          {isShowRoomList ? (
            <RoomList rooms={rooms}/>
          ): (
            gameInfo &&
              <GameDetail
                gameInfo={gameInfo}
                rooms={rooms}
                onShowModal={() => this.setIsShowCreateRoomModal(true)}
                playNow={() => this.setIsShowRoomList(true)}
              />
          )}
        </Box>
        <Snackbar
          anchorOrigin={{
            vertical: 'bottom',
            horizontal: 'right',
          }}
          open={isShowToast}
          autoHideDuration={4000}
          onClose={() => this.setToastShow(false)}
          message={this.state.toastMessage}
          action={
            <React.Fragment>
              <IconButton
                size="small"
                aria-label="close"
                color="inherit"
                onClick={() => this.setToastShow(false)}
              >
                <CloseIcon fontSize="small" />
              </IconButton>
            </React.Fragment>
          }
        />
      </Layout>
    );
  }

  nowLoading(): void {}

  finishLoading(): void {}

  setGameInfo(gameInfo: TGame): void {
    this.setState({ gameInfo });
  }

  setRooms(rooms: TRoom[]): void {
    this.setState({ rooms });
  }

  setRoomID(id: string): void {
    if (id) {
      Router.push({
        pathname: '/room',
        query: { id }
      });
    }
  }

  setToastShow(show: boolean, msg?: string): void {
    if (msg) {
      this.setState({ toastMessage: msg });
    }
    this.setState({ isShowToast: show });
  }

  private setRoomTitle(title: string): void {
    this.setState({ createRoomTitle: title });
  }

  private setRoomPassword(password: string): void {
    this.setState({ createRoomPassword: password });
  }

  private onChangeGameMode(createRoomMode: string): void {
    this.setState({ createRoomMode });
  }

  private createRoom(): void {
    const gameID = this.state.gameID || '';
    this.presenter.createRoom(
      gameID,
      Number(this.state.createRoomMode),
      this.state.createRoomPassword,
      this.state.createRoomTitle
    );
    this.presenter.getRooms();
  }

  private setIsShowCreateRoomModal(show: boolean): void {
    this.setState({ isShowCreateRoomModal: show });
  }

  private setIsShowRoomList(show: boolean): void {
    this.setState({ isShowRoomList: show });
  }
}

export default GameView;

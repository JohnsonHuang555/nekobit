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
import { Box, TextField, InputLabel, Select, MenuItem } from '@material-ui/core';
import AppModal from 'src/components/AppModal';
import '@styles/components/modals/createRoomModal.scss';
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
  gameID: string;
  selectedGameMode: number;
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
      gameID: '',
      selectedGameMode: 0,
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
      selectedGameMode,
      isShowRoomList,
      isShowCreateRoomModal,
    } = this.state;
    return (
      <Layout>
        {/* <CreateRoomModal
          show={isShowCreateRoomModal}
          onCloseMoal={() => this.setIsShowCreateRoomModal(false)}
        /> */}
        <AppModal
          show={isShowCreateRoomModal}
          onClose={() => this.setIsShowCreateRoomModal(false)}
          className="create-room-modal"
          header={(
            <h2>新建房間</h2>
          )}
        >
          <TextField
            required
            id="standard-required"
            label="房間名稱"
            placeholder="請輸入房間名稱"
          />
          <InputLabel id="game-mode">遊戲模式</InputLabel>
          {gameInfo && (
            <Select
              labelId="game-mode"
              id="game-mode"
              value={selectedGameMode}
              onChange={(e) => this.onChangeGameMode(Number(e.target.value))}
            >
              {GameMode[gameInfo.id].map((m, i) => (
                <MenuItem key={i} value={m.value}>{m.label}</MenuItem>
              ))}
            </Select>
          )}
        </AppModal>
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
      </Layout>
    );
  }

  nowLoading(): void {}

  finishLoading(): void {}

  setGameInfo(gameInfo: TGame): void {
    console.log(GameMode[gameInfo.id])
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

  // private createRoom({ roomMode, roomPassword, roomTitle}: TCreateRoom): void {
  //   const gameID = this.state.gameID || '';
  //   this.presenter.createRoom(gameID, roomMode, roomPassword, roomTitle);
  //   this.presenter.getRooms();
  // }

  private setIsShowCreateRoomModal(show: boolean): void {
    this.setState({ isShowCreateRoomModal: show });
  }

  private setIsShowRoomList(show: boolean): void {
    this.setState({ isShowRoomList: show });
  }

  private onChangeGameMode(selectedGameMode: number): void {
    this.setState({ selectedGameMode });
  }
}

export default GameView;

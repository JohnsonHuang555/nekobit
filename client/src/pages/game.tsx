import React from 'react';
import Router from 'next/router';
import Layout from 'src/components/Layout';
import RoomList from 'src/features/main/game/components/RoomList';
import GameDetail from 'src/features/main/game/components/GameDetail';
import CreateRoomModal, { TCreateRoom } from 'src/features/main/game/components/CreateRoomModal';
import { GameContract } from 'src/features/main/game/GameContract';
import { GamePresenter } from 'src/features/main/game/GamePresenter';
import { Injection } from 'src/features/main/game/injection/injection';
import { TGame } from 'src/features/main/domain/models/Game';
import { TRoom } from 'src/features/main/domain/models/Room';
import { GameListMode } from 'src/components/Games/ChineseChess/ModeList';
import { Box } from '@material-ui/core';
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
}

class GameView extends React.Component<GameViewProps, GameViewState>
  implements GameContract.View {

  private presenter: GameContract.Presenter;

  constructor(props: GameViewProps) {
    super(props);
    this.state = {
      gameInfo: undefined,
      userInfo: null,
      ws: undefined,
      rooms: [],
      roomId: '',
      isShowRoomList: false,
      isOnCreateRoom: false,
      isShowCreateRoomModal: false,
    }

    this.presenter = new GamePresenter(
      this,
      Injection.provideUseCaseHandler(),
      Injection.provideConnectSocketUseCase(),
      Injection.provideGetGameInfoUseCase(),
      Injection.provideGetRoomsUseCase(),
      Injection.provideCreateRoomUseCase(),
    )
  }

  componentDidMount() {
    const id = location.search.substr(4);
    this.presenter.mount({ id });
  }

  render() {
    const {
      isShowCreateRoomModal,
      isShowRoomList,
      rooms,
      gameInfo
    } = this.state;
    return (
      <Layout>
        <CreateRoomModal
          show={isShowCreateRoomModal}
          mode={gameInfo && GameListMode[gameInfo.name]}
          onCloseLogin={() => this.setIsShowCreateRoomModal(false)}
          onCreate={(roomData) => this.createRoom(roomData)}
        />
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
    this.setState({ gameInfo });
  }

  setRooms(rooms: TRoom[]): void {
    this.setState({ rooms });
  }

  setRoomID(id: number): void {
    this.presenter.getRooms();
    if (id) {
      Router.push({
        pathname: '/room',
        query: { id }
      });
    }
  }

  private createRoom({ roomMode, roomPassword, roomTitle}: TCreateRoom): void {
    const gameName = this.state.gameInfo?.name || '';
    this.presenter.createRoom(gameName, roomMode, roomPassword, roomTitle);
  }

  private setIsShowCreateRoomModal(show: boolean): void {
    this.setState({ isShowCreateRoomModal: show });
  }

  private setIsShowRoomList(show: boolean): void {
    this.setState({ isShowRoomList: show });
  }
}

export default GameView;

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
import { GameListMode } from 'src/features/games/chinese_chess/ModeList';
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
  gameID: string;
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
      gameID: ''
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

  setRoomID(id: string): void {
    if (id) {
      Router.push({
        pathname: '/room',
        query: { id }
      });
    }
  }

  private createRoom({ roomMode, roomPassword, roomTitle}: TCreateRoom): void {
    const gameID = this.state.gameID || '';
    this.presenter.createRoom(gameID, roomMode, roomPassword, roomTitle);
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

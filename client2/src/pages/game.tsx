import React from 'react';
import Layout from 'src/components/Layout';
import RoomList from 'src/components/RoomList/RoomList';
import GameDetail from 'src/components/GameDetail';
import CreateRoomModal, { TCreateRoom } from 'src/components/Modals/CreateRoomModal';
import { GameContract } from 'src/features/games/game/GameContract';
import { GamePresenter } from 'src/features/games/game/GamePresenter';
import { Injection } from 'src/features/games/game/injection/injection';
import { TGame } from 'src/features/games/domain/models/Game';
import { TRoom } from 'src/features/games/domain/models/Room';
import { GameListMode } from 'src/components/Games/ChineseChess/ModeList';
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
      Injection.provideCreateSocketUseCase(),
      Injection.provideGetGameInfoUseCase(),
      Injection.provideGetRoomsUseCase(),
      Injection.provideCreateRoomUseCase(),
    )
  }

  componentDidMount() {
    const id = location.search.substr(4);
    let userInfo = null;
    if (localStorage.getItem('userInfo')) {
      userInfo = JSON.parse(localStorage.getItem('userInfo') || '');
    }
    this.presenter.mount({ id, userInfo });
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
        <>
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
        </>
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
    // change route to room page
    // reget rooms
    this.presenter.getRooms();
  }

  private createRoom({ roomMode, roomPassword, roomTitle}: TCreateRoom): void {
    this.presenter.createRoom('TestName', roomMode, roomPassword, roomTitle);
  }

  private setIsShowCreateRoomModal(show: boolean): void {
    this.setState({ isShowCreateRoomModal: show });
  }

  private setIsShowRoomList(show: boolean): void {
    this.setState({ isShowRoomList: show });
  }
}
// const GameListMode: any = {
//   '象棋': [
//     {label: '標準(大盤)', value: GameModeCode.Standard},
//     {label: '暗棋(小盤)', value: GameModeCode.Hidden}
//   ],
// }

// const Game: NextPage<{ gameInfo: TGame }> = ({ gameInfo }) => {
//   const [userInfo] = useLocalStorage('userInfo', null);
//   const [showRoomList, setShowRoomList] = useState(false);
//   const [rooms, setRooms] = useState<TRoom[]>([]);
//   const [ws, setWs] = useState<WebSocket>();
//   const [isOnCreateRoom, setIsOnCreateRoom] = useState(false);
//   const [roomID, setRoomID] = useState('');
//   const [isShowCreateRoomModal, setIsShowCreateRoomModal] = useState(false);

//   useEffect(() => {
//     let ws: WebSocket = new WebSocket('ws://localhost:8080/ws/gamePage');
//     ws.onopen = () => {
//       console.log('Successfully Connected in game page');
//       const sendData = JSON.stringify({
//         userID: '',
//         event: 'getRooms',
//         data: {}
//       })
//       ws.send(sendData);
//       setWs(ws);
//     };

//     ws.onclose = (e) => {
//       console.log('Socket Closed Connection: ', e);
//     };

//     ws.onmessage = (websocket: MessageEvent) => {
//       const wsData: TSocket = JSON.parse(websocket.data);
//       if (!wsData) {
//         return;
//       }
//       if (wsData.event === 'getRooms') {
//         setRooms(wsData.data.rooms);
//       } else if (wsData.event === 'createRoom') {
//         // reget rooms
//         const sendData = JSON.stringify({
//           userID: '',
//           event: 'getRooms',
//           data: {}
//         })
//         ws.send(sendData);
//         setRoomID(wsData.data.roomID)
//       }
//     }

//     ws.onerror = (error) => {
//       console.log('Socket Error: ', error);
//       ws.close();
//     };

//     return () => {
//       ws.close();
//     }
//   }, []);

//   useEffect(() => {
//     if (isOnCreateRoom && roomID) {
//       Router.push({
//         pathname: '/room',
//         query: {
//           id: roomID
//         }
//       });
//     }
//   }, [isOnCreateRoom, roomID])

//   const createRoom = (data: any) => {
//     setIsOnCreateRoom(true);
//     const sendData = JSON.stringify({
//       userID: userInfo.id,
//       event: 'createRoom',
//       data: {
//         name: userInfo.name,
//         gameName: gameInfo.name,
//         roomPassword: data.password,
//         roomTitle: data.title,
//         roomMode: data.mode
//       }
//     })
//     if (ws) {
//       ws.send(sendData);
//     }
//   }

//   return (
//     <Layout>
//       <CreateRoomModal
//         show={isShowCreateRoomModal}
//         mode={GameListMode[gameInfo.name]}
//         onCloseLogin={() => setIsShowCreateRoomModal(false)}
//         onCreate={createRoom}
//       />
//       <>
//         {showRoomList? (
//           <RoomList rooms={rooms}/>
//         ): (
//           <GameDetail
//             gameInfo={gameInfo}
//             rooms={rooms}
//             onShowModal={() => setIsShowCreateRoomModal(true)}
//             playNow={() => setShowRoomList(true)}
//           />
//         )}
//       </>
//     </Layout>
//   )
// };

// Game.getInitialProps = async ({ req, query }: any) => {
//   const gameInfo = await GameApi.getGameInfo(query.id);
//   return { gameInfo }
// };

export default GameView;

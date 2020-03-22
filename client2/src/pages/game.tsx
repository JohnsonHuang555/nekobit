import React, { useState, useEffect } from 'react';
import { NextPage } from 'next';
import Router from 'next/router';
import Layout from 'src/components/Layout';
import RoomList from 'src/components/RoomList/RoomList';
import GameDetail from 'src/components/GameDetail';
import CreateRoomModal from 'src/components/Modals/CreateRoomModal';
import GameApi from 'src/api/GameApi';
import useLocalStorage from 'src/customHook/useLocalStorage';
// import { TGame } from 'src/types/Game';
import { TSocket } from 'src/types/Socket';
import { GameModeCode } from 'src/types/ChineseChess';
import { GameContract } from 'src/features/games/game/GameContract';
import { GamePresenter } from 'src/features/games/game/GamePresenter';
import { Injection } from 'src/features/games/game/injection/injection';
import { TGame } from 'src/features/games/domain/models/Game';
import { TRoom } from 'src/features/games/domain/models/Room';
import '@styles/pages/game.scss';

interface GameViewProps {}
interface GameViewState {
  gameInfo?: TGame;
  userInfo: any;
  ws?: WebSocket;
  rooms: TRoom[];
  roomId: string;
  showRoomList: boolean;
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
      showRoomList: false,
      isOnCreateRoom: false,
      isShowCreateRoomModal: false,
    }

    this.presenter = new GamePresenter(
      this,
      Injection.provideUseCaseHandler(),
      Injection.provideCreateSocketUseCase(),
      Injection.provideGetSocketMessageUseCase(),
      Injection.provideGetGameInfoUseCase(),
      Injection.provideGetRoomsUseCase(),
    )
  }

  componentDidMount() {
    const id = location.search.substr(4);
    this.presenter.mount({ id });
  }

  render() {
    return (
      <div>11111</div>
    );
  }

  nowLoading(): void {

  }

  finishLoading(): void {

  }

  setGameInfo(gameInfo: TGame): void {
    this.setState({ gameInfo });
  }

  setRooms(rooms: TRoom[]): void {
    this.setState({ rooms });
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

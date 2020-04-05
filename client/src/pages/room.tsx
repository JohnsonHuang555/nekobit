import React, { useEffect, useState } from 'react';
import Router, { useRouter } from 'next/router';
import { faPen, faDoorOpen } from '@fortawesome/free-solid-svg-icons';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { TSocket } from 'src/types/Socket';
// import { TRoom, TRoomUser } from 'src/types/Room';
import Layout from "src/components/Layout";
import useLocalStorage from 'src/customHook/useLocalStorage';
import RoomUser from 'src/components/RoomList/RoomUser';
import Button from 'src/components/Shared/Button';
import ChineseChess from 'src/components/Games/ChineseChess/ChineseChess';
import '@styles/pages/room.scss';
import { RoomContract } from 'src/features/main/room/roomContract';
import { TRoom, TRoomUser } from 'src/features/main/domain/models/Room';
import { RoomPresenter } from 'src/features/main/room/roomPresenter';
import { Injection } from 'src/features/main/room/injection/injection';

interface RoomViewProps {}
interface RoomViewState {
  roomInfo?: TRoom;
}

class RoomView extends React.Component<RoomViewProps, RoomViewState>
  implements RoomContract.View {

  private presenter: RoomContract.Presenter;

  constructor(props: RoomViewProps) {
    super(props);
    this.state = {
      roomInfo: undefined,
    }

    this.presenter = new RoomPresenter(
      this,
      Injection.provideUseCaseHandler(),
      Injection.provideConnectSocketUseCase(),
      Injection.provideJoinRoomUseCase(),
      Injection.provideLeaveRoomUseCase(),
      Injection.provideReadyGameUseCase(),
      Injection.provideStartGameUseCase(),
    )
  }

  componentDidMount() {
    const id = location.search.substr(4);
    this.presenter.mount({ id });
  }

  render() {
    const {
      roomInfo,
    } = this.state;

    return (
      <Layout id="room-page">
        <div className="row">
          <div className="col-md-8">
            <div className="user-block">
              <div className="header">
                {roomInfo && (
                  <div className="title">
                    <span>{roomInfo.id}.</span>
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
            {/* {
              this.isMaster() ?
              <Button
                className="start"
                disabled={disabledStart()}
                onClick={() => this.startGame()}
                title="Start"
              /> :
              <Button
                className="ready"
                onClick={() => this.readyGame()}
                title={isPlayerReady()}
              />
            } */}
          </div>
          {roomInfo && roomInfo.status === 1 && (
            <div className="game-screen">
              {/* <ShowGameArea /> */}
            </div>
          )}
        </div>
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

  private isMaster(): boolean {
    // if (userInfo && roomInfo) {
    //   const user = roomInfo.userList.find(u => {
    //     return u.id === userInfo.id;
    //   });

    //   return user ? user.isMaster : false;
    // }
    return false;
  }

  private startGame(): void {

  }

  private readyGame(): void {

  }


}


// const Room = () => {
//   const router = useRouter();
//   const [userInfo] = useLocalStorage('userInfo', null);
//   const [ws, setWs] = useState<WebSocket>();
//   const [roomInfo, setRoomInfo] = useState<TRoom>();

//   useEffect(() => {
//     if (!router.query) { return; }
//     let ws: WebSocket = new WebSocket(`ws://localhost:8080/ws/${router.query.id}`)
//     ws.onopen = () => {
//       console.log(`Successfully Connected in Room <${router.query.id}>`);
//       const sendData = JSON.stringify({
//         userID: userInfo.id,
//         event: SocketEvent.JoinRoom,
//         data: {
//           name: userInfo.name,
//           roomID: Number(router.query.id)
//         }
//       })
//       ws.send(sendData);
//       setWs(ws);
//     };

//     ws.onclose = (e) => {
//       console.log('Socket Closed Connection: ', e);
//     };

//     ws.onerror = (error) => {
//       console.log('Socket Error: ', error);
//       ws.close();
//     };

//     initialOnListening(ws);

//     const handleRouteChange = () => {
//       const sendData = JSON.stringify({
//         userID: userInfo.id,
//         event: SocketEvent.LeaveRoom,
//         data: {
//           roomID: Number(router.query.id)
//         }
//       })
//       ws.send(sendData);
//     }

//     Router.events.on('routeChangeStart', handleRouteChange);

//     return () => {
//       Router.events.off('routeChangeStart', handleRouteChange);
//       ws.close();
//     }
//   }, [router.query]);

//   const initialOnListening = (ws: WebSocket) => {
//     let tempRoomInfo: TRoom;
//     if (ws) {
//       ws.onmessage = (websocket: MessageEvent) => {
//         const wsData: TSocket = JSON.parse(websocket.data);
//         if (!wsData) return;
//         switch (wsData.event) {
//           // case SocketEvent.JoinRoom:
//           // case SocketEvent.LeaveRoom:
//           //   tempRoomInfo = wsData.data.roomInfo;
//           //   setRoomInfo(wsData.data.roomInfo);
//           //   break;
//           // case SocketEvent.ReadyGame:
//           //   if (!tempRoomInfo) return;
//           //   setRoomInfo({
//           //     ...tempRoomInfo,
//           //     userList: wsData.data.roomUserList
//           //   });
//           //   break;
//           // case SocketEvent.StartGame:
//           //   if (!tempRoomInfo) return;
//           //   tempRoomInfo = wsData.data.roomInfo;
//           //   setRoomInfo({
//           //     ...tempRoomInfo,
//           //     gameData: wsData.data.roomInfo.gameData
//           //   });
//           //   break;
//         }
//       }
//     }
//   }

//   const isMaster = () => {
//     if (userInfo && roomInfo) {
//       const user = roomInfo.userList.find(u => {
//         return u.id === userInfo.id;
//       });

//       return user ? user.isMaster : false;
//     }
//     return false;
//   };

//   const startGame = () => {
//     if (ws && roomInfo) {
//       const sendData = JSON.stringify({
//         userID: userInfo.id,
//         event: SocketEvent.StartGame,
//         data: {
//           roomID: Number(router.query.id),
//           roomMode: roomInfo.mode
//         }
//       })
//       ws.send(sendData);
//     }
//   }

//   const readyGame = () => {
//     if (ws) {
//       const sendData = JSON.stringify({
//         userID: userInfo.id,
//         event: SocketEvent.ReadyGame,
//         data: {
//           roomID: Number(router.query.id)
//         }
//       })
//       ws.send(sendData);
//     }
//   }

//   const disabledStart = () => {
//     return roomInfo && roomInfo.userList.find(u => {
//       return u.isReady === false;
//     }) ? true : false;
//   };

//   const onChangeRoomInfo = (data: TRoom) => {
//     setRoomInfo({ ...data });
//   }

//   const ShowGameArea = () => {
//     if (!ws || !roomInfo) {
//       return null;
//     }

//     const gameList: any = {
//       '象棋': <ChineseChess
//                 ws={ws}
//                 userID={userInfo.id}
//                 roomInfo={roomInfo}
//                 onChangeRoomInfo={onChangeRoomInfo}
//               />,
//     }
//     return gameList[roomInfo.gameName];
//   }

//   const isPlayerReady = () => {
//     if (userInfo && roomInfo) {
//       const user = roomInfo.userList.find(u => {
//         return u.id === userInfo.id;
//       });

//       return (user && user.isReady) ? 'Cancel' : 'Ready';
//     }
//     return 'Ready';
//   }

//   return (
//     <Layout id="room-page">
//       <div className="row">
//         <div className="col-md-8">
//           <div className="user-block">
//             <div className="header">
//               {roomInfo && (
//                 <div className="title">
//                   <span>{roomInfo.id}.</span>
//                   <span>{roomInfo.title}</span>
//                 </div>
//               )}
//               <span className="icons">
//                 <FontAwesomeIcon icon={faPen}/>
//                 <FontAwesomeIcon icon={faDoorOpen}/>
//               </span>
//             </div>
//             <div className="content">
//               {roomInfo && roomInfo.userList.map((user: TRoomUser) => (
//                 <RoomUser key={user.id} user={user}/>
//               ))}
//             </div>
//           </div>
//           <div className="chat-block"></div>
//         </div>
//         <div className="col-md-4">
//           <div className="settings-block"></div>
//           {
//             isMaster() ?
//             <Button
//               className="start"
//               disabled={disabledStart()}
//               onClick={startGame}
//               title="Start"
//             /> :
//             <Button
//               className="ready"
//               onClick={readyGame}
//               title={isPlayerReady()}
//             />
//           }
//         </div>
//         {roomInfo && roomInfo.status === 1 && (
//           <div className="game-screen">
//             <ShowGameArea />
//           </div>
//         )}
//       </div>
//     </Layout>
//   )
// }

export default RoomView;

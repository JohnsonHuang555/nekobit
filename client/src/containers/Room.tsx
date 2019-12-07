import React, { useEffect, useState, useContext } from 'react';
import { RouteComponentProps } from 'react-router';
import uuid from 'uuid';
import RoomApi from '../api/RoomApi';
import LoginModal from '../components/LoginModal';
import RoomUser from '../components/RoomUser';
import { TRoom, TRoomUser } from '../types/Room';
import { AppContext } from '../contexts/AppContext';
import '../assets/styles/room/room.scss';

type Params = {
  id: string;
}

const Room = (props: RouteComponentProps<Params>) => {
  const {
    userInfo,
    setUserInfo
  } = useContext(AppContext);
  const [isShowLoginModal, setIsShowLoginModal] = useState(false);
  const [isLoading, setIsLoading] = useState(true);
  const [wsRoom, setWsRoom] = useState<WebSocket>();
  const [roomInfo, setRoomInfo] = useState<TRoom>();

  useEffect(() => {
    const roomId = props.match.params.id;
    const getRoomInfo = async () => {
      const data = await RoomApi.getRoomInfo(roomId);
      setRoomInfo(data);
      setIsLoading(false);
    };
    getRoomInfo();
  }, []);

  useEffect(() => {
    let ws: WebSocket;
    const newSocket = () => {
      const locationState = props.location.state;
      const roomId = props.match.params.id;
      ws = new WebSocket(`ws://localhost:8080/ws/${roomId}`);
      ws.onopen = () => {
        console.log(`Successfully Connected in ${roomId}`);
        setWsRoom(ws);

        if (!userInfo) {
          setIsShowLoginModal(true);
          return;
        }

        ws.send(JSON.stringify({
          userID: userInfo.id,
          event: "joinRoom",
          data: {
            isMaster: locationState ? locationState.isMaster : false,
            name: userInfo.name,
          }
        }));
      };

      ws.onclose = (e) => {
        console.log("Socket Closed Connection: ", e);
      };

      ws.onerror = (error) => {
        console.log("Socket Error: ", error);
        ws.close();
      };
    };

    if (!isLoading && roomInfo) {
      // 判斷人數未滿
      if (roomInfo && roomInfo.userList.length + 1 > roomInfo.maxPlayers) {
        props.history.push(`/game/${roomInfo.gameID}`);
      } else {
      // 判斷登入狀態
        newSocket();
      }
    }
    return () => {
      if (ws) {
        ws.close();
      }
    }
  }, [isLoading])

  useEffect(() => {
    if (wsRoom) {
      wsRoom.onmessage = (websocket: MessageEvent) => {
        const wsData = JSON.parse(websocket.data);
        if (!roomInfo) {
          return
        }

        if (wsData.event === 'joinRoom' || wsData.event === 'leaveRoom') {
          setRoomInfo({
            ...roomInfo,
            userList: wsData.data.dbData.userList,
          });
        } else if (wsData.event === 'setGameReady') {
          setRoomInfo({
            ...roomInfo,
            userList: wsData.data.dbData.userList,
          });
        } else if (wsData && wsData.event === 'setGameStart') {
          console.log(wsData)
        }
      }
    }
  }, [wsRoom]);

  const startGame = () => {
    // socket
    if (wsRoom) {
      wsRoom.send(JSON.stringify({
        userID: userInfo.id,
        event: "setGameStart",
        data: {}
      }))
    }
  }

  const readyGame = () => {
    // socket
    if (wsRoom) {
      const user = roomInfo && roomInfo.userList.find(u => {
        return u.id === userInfo.id;
      });
      wsRoom.send(JSON.stringify({
        userID: userInfo.id,
        event: "setGameReady",
        data: {
          isReady: (user as TRoomUser).isReady
        }
      }))
    }
  }

  const login = (name: string) => {
    const userData = {
      name,
      id: uuid(),
      account: "",
      isLogin: true,
    }
    setUserInfo(userData)
    setIsShowLoginModal(false);

    if (wsRoom) {
      wsRoom.send(JSON.stringify({
        userID: userData.id,
        event: "joinRoom",
        data: {
          isMaster: false,
          name: userData.name,
        }
      }));
    }
  }

  const isMaster = () => {
    if (userInfo) {
      const user = roomInfo && roomInfo.userList.find(u => {
        return u.id === userInfo.id;
      });

      return user ? user.isMaster : false;
    }
    return false;
  };

  const disabledStart = () => {
    return roomInfo && roomInfo.userList.find(u => {
      return u.isReady === false;
    }) ? true : false;
  };

  const backToList = () => {
    if (wsRoom && roomInfo) {
      wsRoom.send(JSON.stringify({
        userID: userInfo.id,
        event: "leaveRoom",
        data: {}
      }))
      props.history.push(`/game/${roomInfo.gameID}`)
    }
  }

  return (
    <>
      {!isLoading ?
        <LoginModal show={isShowLoginModal} login={login}/>
        : null
      }
      <div className="container-fluid room">
        <div className="row">
          <div className="col-md-3">
            {
              roomInfo && roomInfo.userList.map((user: TRoomUser, index) => {
                return <RoomUser key={index} user={user}/>
              })
            }
            <div onClick={backToList}>Back to list</div>
            {
              isMaster() ?
              <button className="start" disabled={disabledStart()} onClick={startGame}>Start</button> :
              <button className="ready" onClick={readyGame}>Ready</button>
            }
          </div>
          <div className="col-md-9">
            Game screen
          </div>
        </div>
      </div>
    </>
  )
}

export default Room;

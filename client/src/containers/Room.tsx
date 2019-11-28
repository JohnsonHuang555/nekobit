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
  const [roomInfo, setRoomInfo] = useState<TRoom>({
    _id: "",
    userList: [],
    title: "",
    mode: 0,
    isLock: false,
    currentPlayer: 0,
    maxPlayers: 0,
    createDate: "",
    nowTurn: 0,
    gameStatus: 0,
    gameName: ""
  });

  useEffect(() => {
    const roomId = props.match.params.id;
    const locationState = props.location.state;
    // set room websocket
    let ws = new WebSocket(`ws://localhost:8080/ws/${roomId}`);
    console.log(userInfo)
    ws.onopen = () => {
      console.log(`Successfully Connected in ${roomId}`);
      setWsRoom(ws);
      if (userInfo) {
        ws.send(JSON.stringify({
          userID: userInfo.id,
          event: "joinRoom",
          data: {
            isMaster: locationState ? locationState.isMaster : false,
            name: userInfo.name,
          }
        }));
      } else {
        setIsShowLoginModal(true);
      }
    };

    ws.onclose = (e) => {
      console.log("Socket Closed Connection: ", e);
    };

    ws.onerror = (error) => {
      console.log("Socket Error: ", error);
      ws.close();
    };

    const getRoomInfo = async () => {
      const data = await RoomApi.getRoomInfo(roomId);
      setRoomInfo(data);
      setIsLoading(false);
    };
    getRoomInfo();

    return () => {
      ws.close();
    }
  }, []);

  useEffect(() => {
    console.log(wsRoom)
    if (wsRoom) {
      wsRoom.onmessage = (websocket: MessageEvent) => {
        const wsData = JSON.parse(websocket.data);
        console.log(wsData)
        if (wsData.event === 'joinRoom' || wsData.event === 'leaveRoom') {
          setRoomInfo({
            ...roomInfo,
            userList: wsData.data.dbData.userList,
          });
        } else if (wsData && wsData.event === 'setGameReady') {
          let tempUserList = roomInfo.userList;
          tempUserList.forEach(u => {
            if (u.id === wsData.sender) {
              u.isReady = !wsData.data.isReady;
            }
          });

          setRoomInfo({
            userList: tempUserList,
            ...roomInfo
          });
        } else if (wsData && wsData.event === 'setGameStart') {

        }
      }
    }
  }, [isLoading]);

  const startGame = () => {
    // socket
    if (wsRoom) {
      const roomId = props.match.params.id;
      wsRoom.send(JSON.stringify({
        sender: userInfo.id,
        receiver: roomId,
        event: "setGameStart",
        data: {}
      }))
    }
  }

  const readyGame = () => {
    // socket
    if (wsRoom) {
      const roomId = props.match.params.id;
      const user = roomInfo.userList.find(u => {
        return u.id === userInfo.id;
      });
      wsRoom.send(JSON.stringify({
        sender: userInfo.id,
        receiver: roomId,
        event: "setGameReady",
        data: {
          isReady: (user as TRoomUser).isReady
        }
      }))
    }
  }

  const onLogin = (name: string) => {
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
      const user = roomInfo.userList.find(u => {
        return u.id === userInfo.id;
      });

      return user ? user.isMaster : false;
    }
    return false;
  };

  const disabledStart = () => {
    return roomInfo.userList.find(u => {
      return u.isReady === false;
    }) ? true : false;
  };

  const backToList = () => {
    // TODO: back to list
    if (wsRoom) {
      wsRoom.send(JSON.stringify({
        userID: userInfo.id,
        event: "leaveRoom",
        data: {}
      }))
      props.history.push(`/game/${roomInfo.gameName}`)
    }
  }

  return (
    <>
      <LoginModal show={isShowLoginModal} onLogin={onLogin}/>
      <div className="container-fluid room">
        <div className="row">
          <div className="col-md-3">
            {
              roomInfo.userList.map((user: TRoomUser, index) => {
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

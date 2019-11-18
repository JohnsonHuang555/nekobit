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
    joinRoom,
    wsRoom,
    userInfo,
    setUserInfo
  } = useContext(AppContext);
  const [isShowLoginModal, setIsShowLoginModal] = useState(false);
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
    const getRoomInfo = async () => {
      const data = await RoomApi.getRoomInfo(roomId);
      setRoomInfo(data);
    };
    getRoomInfo();
    if (!userInfo) {
      setIsShowLoginModal(true);
    } else {
      // 切換 ws channel
      joinRoom(roomId, {
        sender: userInfo.id,
        receiver: roomId,
        event: "joinRoom",
        data: {
          isMaster: locationState ? locationState.isMaster : false,
          name: userInfo.name,
        }
      });
    }
  }, []);

  useEffect(() => {
    if (wsRoom) {
      wsRoom.onmessage = (websocket: MessageEvent) => {
        const wsData = JSON.parse(websocket.data);
        if (wsData && wsData.event === 'joinRoom') {
          const userList = roomInfo.userList;
          userList.push({
            id: wsData.sender,
            name: wsData.data.name,
            isMaster: wsData.data.isMaster,
            isReady: wsData.data.isMaster ? true : false,
            playOrder: 0
          })
          setRoomInfo({
            userList,
            ...roomInfo,
          })
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
        }
      }
    }
  }, [wsRoom]);

  const startGame = () => {
    // socket
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

    const roomId = props.match.params.id;
    // 切換 ws channel
    joinRoom(roomId, {
      sender: userData.id,
      receiver: roomId,
      event: "joinRoom",
      data: {
        isMaster: false,
        name: userData.name,
      }
    });
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

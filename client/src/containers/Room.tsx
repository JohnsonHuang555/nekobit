import React, { useEffect, useState, useContext } from 'react';
import { RouteComponentProps } from 'react-router';
import uuid from 'uuid';
import RoomApi from '../api/RoomApi';
import LoginModal from '../components/LoginModal';
import RoomUser from '../components/RoomUser';
import { TRoom, TRoomUser } from '../types/Room';
import { TUser } from '../types/Account';
import { AppContext } from '../contexts/AppContext';
import '../assets/styles/room/room.scss';

type Params = {
  id: string;
}

const Room = (props: RouteComponentProps<Params>) => {
  const { joinRoom, wsRoom } = useContext(AppContext);
  const [isShowLoginModal, setIsShowLoginModal] = useState(false);
  const [userInfo, setUserInfo] = useState<TUser>();
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
    const getRoomInfo = async () => {
      const data = await RoomApi.getRoomInfo(roomId);
      setRoomInfo(data);
    };
    getRoomInfo();

    const user = localStorage.getItem('userInfo');
    if (!user) {
      setIsShowLoginModal(true);
    } else {
      setUserInfo(JSON.parse(user));

      // 切換 ws channel
      joinRoom(roomId, {
        sender: JSON.parse(user).id,
        receiver: roomId,
        event: "joinRoom",
        data: JSON.parse(user).name
      });
    }
  }, []);

  useEffect(() => {
    if (wsRoom) {
      wsRoom.onmessage = (websocket: MessageEvent) => {
        const data = JSON.parse(websocket.data);
        if (data && data.event === 'joinRoom') {
          console.log(data)
          roomInfo.userList.push({
            id: data.sender,
            name: data.data,
            isMaster: false,
            isReady: false,
            playOrder: 0
          })
        }
      }
    }
  }, [wsRoom])

  const startGame = () => {
    // socket
  }

  const readyGame = () => {
    // socket
  }

  const onLogin = (name: string) => {
    const userData = {
      name,
      id: uuid(),
      account: "",
      isLogin: true,
    }
    localStorage.setItem('userInfo', JSON.stringify(userData));
    setIsShowLoginModal(false);
    const roomId = props.match.params.id;

    // 切換 ws channel
    const user = localStorage.getItem('userInfo');
    if (user) {
      joinRoom(roomId, {
        sender: JSON.parse(user).id,
        receiver: roomId,
        event: "joinRoom",
        data: JSON.parse(user).name
      });
    }
  }

  const isMaster = () => {
    if (userInfo) {
      return roomInfo.userList.find(u => {
        return u.id === userInfo.id;
      }) ? true : false;
    }
    return false;
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
              <div className="start" onClick={startGame}>Start</div> :
              <div className="ready" onClick={readyGame}>Ready</div>
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

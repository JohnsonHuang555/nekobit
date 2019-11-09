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
  const { changeChannel, wsRoom } = useContext(AppContext);
  const [isShowLoginModal, setIsShowLoginModal] = useState(false);

  const [roomInfo, setRoomInfo] = useState<TRoom>({
    _id: "",
    UserList: [],
    Title: "",
    Mode: 0,
    IsLock: false,
    CurrentPlayer: 0,
    MaxPlayers: 0,
    CreateDate: "",
    NowTurn: 0,
    GameStatus: 0,
    GameName: ""
  });

  const [userInfo, setUserInfo] = useState<TUser>();

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
      changeChannel(roomId, {
        sender: JSON.parse(user).id,
        event: "joinRoom",
        content: "johnson"
      });
    }
  }, [props]);

  useEffect(() => {
    if (wsRoom) {
      wsRoom.onmessage = (msg: any) => {
        const data = JSON.parse(msg.data)
        if (data.event === 'joinRoom') {
          console.log(1234)
          let currentUserList = roomInfo.UserList
          currentUserList.push({
            Id: data.sender,
            Name: data.content,
            IsMaster: false,
            IsReady: false,
            PlayOrder: 0
          })
          setRoomInfo({
            ...roomInfo,
            UserList: currentUserList
          })
        }
        console.log(JSON.parse(msg.data));
      };
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
  }

  const isMaster = () => {
    if (userInfo) {
      return roomInfo.UserList.find(u => {
        return u.Id === userInfo.id;
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
              roomInfo.UserList.map((user: TRoomUser, index) => {
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

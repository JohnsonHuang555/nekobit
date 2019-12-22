import React, { useEffect, useState } from 'react';
import { useRouter } from 'next/router';
import { TSocket } from '../types/Socket';
import { TRoom, TRoomUser } from '../types/Room';
import Layout from "../components/Layout"
import useLocalStorage from '../customHook/useLocalStorage';
import RoomUser from '../components/RoomList/RoomUser';
import Button from '../components/Shared/Button';
import ChineseChess from '../components/Games/ChineseChess';
import { TChineseChess } from '../types/ChineseChess';
import GameArea from '../components/Games/GameArea';

const Room = () => {
  const router = useRouter();
  const [userInfo] = useLocalStorage('userInfo', null);
  const [ws, setWs] = useState<WebSocket>();
  const [roomInfo, setRoomInfo] = useState<TRoom>();

  useEffect(() => {
    if (!router.query) {
      return;
    }
    let ws: WebSocket = new WebSocket(`ws://localhost:8080/ws/${router.query.id}`)
    let tempRoomInfo: TRoom;
    ws.onopen = () => {
      console.log(`Successfully Connected in Room <${router.query.id}>`);
      const sendData = JSON.stringify({
        userID: userInfo.id,
        event: 'joinRoom',
        data: {
          name: userInfo.name,
          roomID: Number(router.query.id)
        }
      })
      ws.send(sendData);
      setWs(ws);
    };

    ws.onclose = (e) => {
      console.log('Socket Closed Connection: ', e);
    };

    ws.onmessage = (websocket: MessageEvent) => {
      const wsData: TSocket = JSON.parse(websocket.data);
      if (!wsData) return;
      if (wsData.event === 'joinRoom') {
        tempRoomInfo = wsData.data.roomInfo;
        setRoomInfo(wsData.data.roomInfo);
      } else if (wsData.event === 'readyGame') {
        if (!tempRoomInfo) return;
        setRoomInfo({
          ...tempRoomInfo,
          userList: wsData.data.roomUserList
        });
      } else if (wsData.event === 'startGame') {
        if (!tempRoomInfo) return;
        tempRoomInfo = wsData.data.roomInfo;
        setRoomInfo({
          ...tempRoomInfo,
          gameData: wsData.data.gameData
        });
      }
    }

    ws.onerror = (error) => {
      console.log('Socket Error: ', error);
      ws.close();
    };

    return () => {
      ws.close();
    }
  }, [router.query]);

  const isMaster = () => {
    if (userInfo) {
      const user = roomInfo && roomInfo.userList.find(u => {
        return u.id === userInfo.id;
      });

      return user ? user.isMaster : false;
    }
    return false;
  };

  const startGame = () => {
    if (ws) {
      const sendData = JSON.stringify({
        userID: userInfo.id,
        event: 'startGame',
        data: {
          roomID: Number(router.query.id)
        }
      })
      ws.send(sendData);
    }
  }

  const readyGame = () => {
    if (ws) {
      const sendData = JSON.stringify({
        userID: userInfo.id,
        event: 'readyGame',
        data: {
          roomID: Number(router.query.id)
        }
      })
      ws.send(sendData);
    }
  }

  const disabledStart = () => {
    return roomInfo && roomInfo.userList.find(u => {
      return u.isReady === false;
    }) ? true : false;
  };

  const ShowGameArea = () => {
    if (!ws || !roomInfo) {
      return null;
    }
    return <GameArea roomInfo={roomInfo} websocket={ws}/>;
  }

  return (
    <Layout>
      <div className="container">
        <div className="row">
          <div className="col-md-3">
            {
              roomInfo && roomInfo.userList.map((user: TRoomUser) => {
                return <RoomUser key={user.id} user={user}/>
              })
            }
            <div>Back to list</div>
            {
              isMaster() ?
              <Button
                className="start"
                disabled={disabledStart()}
                onClick={startGame}
                title="Start"
              /> :
              <Button
                className="ready"
                onClick={readyGame}
                title="Ready"
              />
            }
          </div>
          <div className="col-md-9">
            {roomInfo && roomInfo.status !== 0 &&<ShowGameArea />}
          </div>
        </div>
      </div>
    </Layout>
  )
}

export default Room;

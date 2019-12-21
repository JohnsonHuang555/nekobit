import React, { useEffect, useState } from 'react';
import { useRouter } from 'next/router';
import { TSocket } from '../types/Socket';
import { TRoom, TRoomUser } from '../types/Room';
import Layout from "../components/Layout"
import useLocalStorage from '../customHook/useLocalStorage';
import RoomUser from '../components/RoomList/RoomUser';
import Button from '../components/Shared/Button';

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
      if (!wsData) {
        return;
      }

      if (wsData.event === 'joinRoom') {
        setRoomInfo(wsData.data.roomInfo)
      } else if (wsData.event === 'readyGame') {
        console.log(wsData.data)
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
    console.log("start")
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
        </div>
      </div>
    </Layout>
  )
}

export default Room;

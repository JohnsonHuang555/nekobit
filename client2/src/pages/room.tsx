import React, { useEffect, useState } from 'react';
import { useRouter } from 'next/router';
import { TSocket } from '../types/Socket';
import { TRoom } from '../types/Room';
import Layout from "../components/Layout"
import useLocalStorage from '../customHook/useLocalStorage';

const Room = () => {
  const router = useRouter();
  const [userInfo] = useLocalStorage('userInfo', null);
  const [ws, setWs] = useState<WebSocket>();
  const [roomInfo, setRoomInfo] = useState<TRoom>();

  useEffect(() => {
    let ws: WebSocket = new WebSocket(`ws://localhost:8080/ws/${router.query.id}`)

    ws.onopen = () => {
      console.log(`Successfully Connected in Room <${router.query.id}>`);
      const sendData = JSON.stringify({
        userID: userInfo.id,
        event: 'joinRoom',
        data: {
          name: userInfo.name,
          isMaster: Boolean(router.query.isMaster),
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
      console.log(wsData)
      if (wsData.event === 'joinRoom') {
        setRoomInfo(wsData.data.roomInfo)
      }
    }

    ws.onerror = (error) => {
      console.log('Socket Error: ', error);
      ws.close();
    };

    return () => {
      ws.close();
    }
  }, [])

  return (
    <Layout>
      <div>{router.query.id}</div>
    </Layout>
  )
}

export default Room;

import React, { useState, useEffect } from 'react';
import { NextPage } from 'next';
import Router from 'next/router';
import Layout from "../components/Layout";
import RoomList from '../components/RoomList/RoomList';
import GameDetail from '../components/GameDetail';
import GameApi from '../api/GameApi';
import useLocalStorage from '../customHook/useLocalStorage';
import { TRoom } from '../types/Room';
import { TGame } from '../types/Game';
import { TSocket } from '../types/Socket';

import '@styles/pages/game.scss';

const Game: NextPage<{ gameInfo: TGame }> = ({ gameInfo }) => {
  const [userInfo] = useLocalStorage('userInfo', null);
  const [showRoomList, setShowRoomList] = useState(false);
  const [rooms, setRooms] = useState<TRoom[]>([]);
  const [ws, setWs] = useState<WebSocket>();

  useEffect(() => {
    let ws: WebSocket = new WebSocket('ws://localhost:8080/ws/gamePage');
    ws.onopen = () => {
      console.log('Successfully Connected in game page');
      const sendData = JSON.stringify({
        userID: '',
        event: 'getRooms',
        data: {}
      })
      ws.send(sendData);
      setWs(ws);
    };

    ws.onclose = (e) => {
      console.log('Socket Closed Connection: ', e);
    };

    ws.onmessage = (websocket: MessageEvent) => {
      const wsData: TSocket = JSON.parse(websocket.data);
      if (wsData.event === 'getRooms') {
        setRooms(wsData.data.rooms);
      } else if (wsData.event === 'createRoom') {
        Router.push({
          pathname: '/room',
          query: {
            id: wsData.data.roomID,
            isMaster: true
          }
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
  }, []);

  const createRoom = (data: any) => {
    const sendData = JSON.stringify({
      userID: userInfo.id,
      event: 'createRoom',
      data: {
        name: userInfo.name,
        isMaster: true,
        roomPassword: data.roomPassword,
        roomTitle: data.roomTitle,
        roomStatus: data.roomStatus
      }
    })
    if (ws) {
      ws.send(sendData)
    }
  }

  return (
    <Layout>
      <>
        {showRoomList? (
          <RoomList rooms={rooms}/>
        ): (
          <GameDetail
            gameInfo={gameInfo}
            rooms={rooms}
            createRoom={createRoom}
            playNow={() => setShowRoomList(true)}
          />
        )}
      </>
    </Layout>
  )
};

Game.getInitialProps = async ({ req, query }: any) => {
  const gameInfo = await GameApi.getGameInfo(query.id);
  return { gameInfo }
};

export default Game;

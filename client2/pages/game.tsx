import React, { useState, useEffect } from 'react';
import { NextPage } from 'next';
import Layout from "../components/Layout";
import RoomList from '../components/RoomList/RoomList';
import GameDetail from '../components/GameDetail';
import GameApi from '../api/GameApi';
import { TRoom } from '../types/Room';
import { TGame } from '../types/Game';

import "@styles/game.scss";

const Game: NextPage<{ gameInfo: TGame }> = ({ gameInfo }) => {
  const [showRoomList, setShowRoomList] = useState(false);
  const [rooms, setRooms] = useState<TRoom[]>([]);

  useEffect(() => {
    let ws: WebSocket = new WebSocket('ws://localhost:8080/ws/gamePage');
    ws.onopen = () => {
      console.log('Successfully Connected in game page');
      const tt = JSON.stringify({
        userID: "",
        event: "getRooms",
        data: {}
      })
      ws.send(tt);
    };

    ws.onclose = (e) => {
      console.log("Socket Closed Connection: ", e);
    };

    ws.onmessage = (websocket: MessageEvent) => {
      const wsData = JSON.parse(websocket.data);
      setRooms(wsData.data.rooms);
    }

    ws.onerror = (error) => {
      console.log("Socket Error: ", error);
      ws.close();
    };

    return () => {
      ws.close();
    }
  }, []);

  return (
    <Layout>
      <>
        {showRoomList? (
          <RoomList rooms={rooms}/>
        ): (
          <GameDetail
            gameInfo={gameInfo}
            rooms={rooms}
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

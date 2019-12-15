import React, { useState } from 'react';
import { NextPage } from 'next';
import Layout from "../components/Layout";
import RoomList from '../components/RoomList/RoomList';
import GameDetail from '../components/GameDetail';
import GameApi from '../api/GameApi';
import { TRoom } from '../types/Room';
import { TGame } from '../types/Game';

import "@styles/game.scss";

// TODO:補上
const rooms: TRoom[] = [

]

const Game: NextPage<{ gameInfo: TGame }> = ({ gameInfo }) => {
  const [showRoomList, setShowRoomList] = useState(false);

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

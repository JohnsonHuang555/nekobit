import React, { useState, useEffect } from 'react';
import { NextPage } from 'next';
import Router from 'next/router';
import Layout from 'src/components/Layout';
import RoomList from 'src/components/RoomList/RoomList';
import GameDetail from 'src/components/GameDetail';
import CreateRoomModal from 'src/components/Modals/CreateRoomModal';
import GameApi from 'src/api/GameApi';
import useLocalStorage from 'src/customHook/useLocalStorage';
import { TRoom } from 'src/types/Room';
import { TGame } from 'src/types/Game';
import { TSocket } from 'src/types/Socket';
import { GameModeCode } from 'src/types/ChineseChess';
import '@styles/pages/game.scss';

const GameListMode: any = {
  '象棋': [
    {label: '標準(大盤)', value: GameModeCode.Standard},
    {label: '暗棋(小盤)', value: GameModeCode.Hidden}
  ],
}

const Game: NextPage<{ gameInfo: TGame }> = ({ gameInfo }) => {
  const [userInfo] = useLocalStorage('userInfo', null);
  const [showRoomList, setShowRoomList] = useState(false);
  const [rooms, setRooms] = useState<TRoom[]>([]);
  const [ws, setWs] = useState<WebSocket>();
  const [isOnCreateRoom, setIsOnCreateRoom] = useState(false);
  const [roomID, setRoomID] = useState('');
  const [isShowCreateRoomModal, setIsShowCreateRoomModal] = useState(false);

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
      if (!wsData) {
        return;
      }
      if (wsData.event === 'getRooms') {
        setRooms(wsData.data.rooms);
      } else if (wsData.event === 'createRoom') {
        // reget rooms
        const sendData = JSON.stringify({
          userID: '',
          event: 'getRooms',
          data: {}
        })
        ws.send(sendData);
        setRoomID(wsData.data.roomID)
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

  useEffect(() => {
    if (isOnCreateRoom && roomID) {
      Router.push({
        pathname: '/room',
        query: {
          id: roomID
        }
      });
    }
  }, [isOnCreateRoom, roomID])

  const createRoom = (data: any) => {
    setIsOnCreateRoom(true);
    const sendData = JSON.stringify({
      userID: userInfo.id,
      event: 'createRoom',
      data: {
        name: userInfo.name,
        gameName: gameInfo.name,
        roomPassword: data.password,
        roomTitle: data.title,
        roomMode: data.mode
      }
    })
    if (ws) {
      ws.send(sendData);
    }
  }

  return (
    <Layout>
      <CreateRoomModal
        show={isShowCreateRoomModal}
        mode={GameListMode[gameInfo.name]}
        onCloseLogin={() => setIsShowCreateRoomModal(false)}
        onCreate={createRoom}
      />
      <>
        {showRoomList? (
          <RoomList rooms={rooms}/>
        ): (
          <GameDetail
            gameInfo={gameInfo}
            rooms={rooms}
            onShowModal={() => setIsShowCreateRoomModal(true)}
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

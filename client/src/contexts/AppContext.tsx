import React, { createContext, useEffect, useState } from 'react';
import GameApi from '../api/GameApi';
import { TSocket } from '../types/Socket';

export const AppContext = createContext<any>(null);

const AppContextProvider = (props: any) => {
  const [games, setGames] = useState([]);
  const [wsRoom, setWsRoom] = useState<WebSocket>();

  useEffect(() => {
    const getAllGames = async () => {
      const data = await GameApi.getAllGames();
      setGames(data);
    };
    getAllGames();
  }, []);

  const joinRoom = (channel: string, socketData: TSocket) => {
    let roomWs = new WebSocket(`ws://localhost:8080/ws`);
    roomWs.onopen = () => {
      console.log(`Successfully Connected in ${channel}`);
      setWsRoom(roomWs);
      roomWs.send(JSON.stringify({
        sender: socketData.sender,
        receiver: socketData.receiver,
        event: socketData.event,
        data: socketData.data
      }))
    };
    roomWs.onclose = (event) => {
      console.log("Socket Closed Connection: ", event)
    };
    roomWs.onerror = (error) => {
      console.log("Socket Error: ", error)
      roomWs.close();
    };
  }

  return (
    <AppContext.Provider value={{ games, joinRoom, wsRoom }}>
      {props.children}
    </AppContext.Provider>
  )
}

export default AppContextProvider;

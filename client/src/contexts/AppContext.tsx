import React, { createContext, useEffect, useState } from 'react';
import GameApi from '../api/GameApi';
import { TSocket } from '../types/Socket';

export const AppContext = createContext<any>(null);

const AppContextProvider = (props: any) => {
  const [games, setGames] = useState([]);
  // const [wsLobby, setWsLobby] = useState<WebSocket>();
  const [wsRoom, setWsRoom] = useState<WebSocket>();

  useEffect(() => {
    const getAllGames = async () => {
      const data = await GameApi.getAllGames();
      setGames(data);
    };
    getAllGames();

    // const connectSocket = () => {
    //   let ws = new WebSocket("ws://localhost:8080/ws/lobby");

    //   ws.onopen = () => {
    //     console.log("Successfully Connected in lobby");
    //     setWsLobby(ws);
    //   };
    //   ws.onclose = (event) => {
    //     console.log("Socket Closed Connection: ", event)
    //   };
    //   ws.onerror = (error) => {
    //     console.log("Socket Error: ", error)
    //     ws.close();
    //   };
    // };
    // connectSocket();
  }, []);

  const changeChannel = (channel: string, socketData: TSocket) => {
    let roomWs = new WebSocket(`ws://localhost:8080/ws/${channel}`);
    roomWs.onopen = () => {
      console.log(`Successfully Connected in ${channel}`);
      setWsRoom(roomWs);
      roomWs.send(JSON.stringify({
        sender: socketData.sender,
        event: socketData.event,
        content: socketData.content
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
    <AppContext.Provider value={{ games, changeChannel, wsRoom }}>
      {props.children}
    </AppContext.Provider>
  )
}

export default AppContextProvider;

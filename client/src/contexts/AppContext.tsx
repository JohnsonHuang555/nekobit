import React, { createContext, useEffect, useState } from 'react';
import GameApi from '../api/GameApi';

export const AppContext = createContext<any>(null);

const AppContextProvider = (props: any) => {
  const [games, setGames] = useState([]);
  const [ws, setWs] = useState<WebSocket>();

  useEffect(() => {
    const getAllGames = async () => {
      const data = await GameApi.getAllGames();
      setGames(data);
    };
    getAllGames();

    const connectSocket = () => {
      let ws = new WebSocket("ws://localhost:8080/ws/1");

      ws.onopen = () => {
        console.log("Successfully Connected");
        setWs(ws);
        ws.send("Hi~~ from client")
      };

      ws.onmessage = (msg) => {
        console.log(msg);
      }

      ws.onclose = (event) => {
        console.log("Socket Closed Connection: ", event)
      };

      ws.onerror = (error) => {
        console.log("Socket Error: ", error)
        ws.close();
      };
    };
    connectSocket();
  }, []);

  return (
    <AppContext.Provider value={{ ws, games }}>
      {props.children}
    </AppContext.Provider>
  )
}

export default AppContextProvider;

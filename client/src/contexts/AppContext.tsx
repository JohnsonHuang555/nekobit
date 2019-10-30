import React, { createContext, useEffect, useState } from 'react';
import GameApi from '../api/GameApi';
import { User } from '../types/User';
import uuid from 'uuid';

export const AppContext = createContext<any>(null);

const AppContextProvider = (props: any) => {
  const [games, setGames] = useState([]);
  const [ws, setWs] = useState<WebSocket>();
  const [user, setUser] = useState<User>({
    id: "",
    name: "",
    account: "",
    isLogin: false,
  });

  useEffect(() => {
    const getAllGames = async () => {
      const data = await GameApi.getAllGames();
      setGames(data);
    };
    getAllGames();

    const connectSocket = () => {
      let ws = new WebSocket("ws://localhost:8080/ws");

      ws.onopen = () => {
        console.log("Successfully Connected");
        setWs(ws);
        ws.send("Hi~~ from client")
      };

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

  useEffect(() => {
    const user = localStorage.getItem('userInfo');
    if (user) {
      console.log(1235)
    }
  }, [user]);

  const fastLogin = (name: string) => {
    const userData = {
      name,
      id: uuid(),
      account: "",
      isLogin: true,
    }
    localStorage.setItem('userInfo', JSON.stringify(userData));
  };

  return (
    <AppContext.Provider value={{ ws, games, user, fastLogin }}>
      {props.children}
    </AppContext.Provider>
  )
}

export default AppContextProvider;

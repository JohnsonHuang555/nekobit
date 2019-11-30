import React, { createContext, useEffect, useState } from 'react';
import GameApi from '../api/GameApi';
import useLocalStorage from '../customHook/useLocalStorage';

export const AppContext = createContext<any>(null);

const AppContextProvider = (props: any) => {
  const [games, setGames] = useState([]);
  const [userInfo, setUserInfo] = useLocalStorage('userInfo', null);

  useEffect(() => {
    const getAllGames = async () => {
      const data = await GameApi.getAllGames();
      setGames(data);
    };
    getAllGames();
  }, []);

  return (
    <AppContext.Provider value={{
      games,
      userInfo,
      setUserInfo
    }}>
      {props.children}
    </AppContext.Provider>
  )
}

export default AppContextProvider;

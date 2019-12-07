import React, { useState, useEffect, useContext } from 'react';
import { RouteComponentProps } from 'react-router-dom';
import GameDetail from '../components/GameDetail';
import RoomListPage from '../components/RoomListPage';
import RoomList from '../components/RoomList';
import { AppContext } from '../contexts/AppContext';
import GameApi from '../api/GameApi';
import RoomApi from '../api/RoomApi';
import { TGame } from '../types/Game';
import { TRoom } from '../types/Room';
import '../assets/styles/game.scss';

type Params = {
  gameID: string;
}

const Game = (props: RouteComponentProps<Params>) => {
  const [gameInfo, setGameInfo] = useState<TGame>({
    _id: "",
    name: "",
    maxPlayers: 0,
    rules: [],
    brief: "",
    description: "",
    imgURL: "",
    estimateTime: 0,
    createdDate: ""
  });

  const {
    userInfo,
    setUserInfo
  } = useContext(AppContext);

  const [rooms, setRooms] = useState<TRoom[]>([]);
  const [isShowLoginModal, setIsShowLoginModal] = useState(false);
  const [showRoomList, setShowRoomList] = useState(false);

  const playNow = () => {
    if (userInfo) {
      setShowRoomList(true);
    } else {
      setIsShowLoginModal(true);
    }
  };

  useEffect(() => {
    const gameID = props.match.params.gameID;
    const getGameInfo = async () => {
      const data = await GameApi.getGameInfo(gameID);
      setGameInfo(data);
    };

    const getRooms = async () => {
      const data = await RoomApi.getRooms(gameID);
      setRooms(data);
    }
    getGameInfo();
    getRooms();
  }, [props]);

  return (
    <>
      {showRoomList ? (
        <RoomListPage/>
        // <Room
        //   rooms={rooms}
        //   location={props.history}
        // />
      ) : (
        <GameDetail
          gameInfo={gameInfo}
          rooms={rooms}
          playNow={playNow}
        />
        )
      }
    </>
  )
}

export default Game;

import React, { useState, useEffect } from 'react';
import { RouteComponentProps } from 'react-router-dom';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
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

  const [rooms, setRooms] = useState<TRoom[]>([]);

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

  const roomList = rooms && rooms.map((room: TRoom) => {
    const chooseRoom = () => {
      props.history.push(`/room/${room._id}`);
    }
    return (
      <div className="room-info" key={room._id} onClick={chooseRoom}>
        <div className="title">{room.title}</div>
        <div className="info">
          <span className="mode mr-3">暗棋</span>
          {room.isLock ? <FontAwesomeIcon className="mr-3" icon="lock" /> : null}
          <FontAwesomeIcon icon="user" className="mr-3" /> {room.currentPlayer} / {room.maxPlayers}
        </div>
      </div>
    )
  });

  return (
    <div id="game" className="container-fluid">
      <div className="row">
        <div className="col-md-3">
          <img src={gameInfo.imgURL} alt={gameInfo.name} width="100%" />
          <h2>{gameInfo.name}</h2>
          <p>{gameInfo.description}</p>
          <FontAwesomeIcon icon="user" className="mr-2" />
          <span>{gameInfo.maxPlayers}</span>
        </div>
        <div className="col-md-3">
          <div className="title">Room List</div>
          <div className="body">
            {roomList}
          </div>
        </div>
      </div>
    </div>
  )
}

export default Game;

import React, { useState, useEffect } from 'react';
import { RouteComponentProps } from 'react-router-dom';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import GameApi from '../api/GameApi';
import RoomApi from '../api/RoomApi';
import { GameProps } from '../types/Game';
import { RoomProps } from '../types/Room';

type ParamsProps = {
  gameName: string;
}

const Game = (props: RouteComponentProps<ParamsProps>) => {
  const [gameInfo, setGameInfo] = useState<GameProps>({
    _id: "",
    Name: "",
    MaxPlayers: 0,
    Rules: [],
    Brief: "",
    Description: "",
    ImgUrl: "",
    EstimateTime: 0,
    CreatedDate: ""
  });

  const [rooms, setRooms] = useState<RoomProps[]>([]);

  useEffect(() => {
    const gameName = props.match.params.gameName;
    const getGameInfo = async () => {
      const data = await GameApi.getGameInfo(gameName);
      setGameInfo(data);
    };

    const getRooms = async () => {
      const data = await RoomApi.getRooms(gameName);
      setRooms(data);
    }
    getGameInfo();
    getRooms();
  }, [props]);

  const roomList = rooms.map((room: RoomProps) => {
    return (
      <div className="room-info" key={room._id}>
        <div className="title">{room.Title}</div>
        <div className="info">
          <span className="mode mr-3">暗棋</span>
          {room.IsLock ? <FontAwesomeIcon className="mr-3" icon="lock" /> : null}
          <FontAwesomeIcon icon="user" className="mr-3" /> {room.CurrentPlayer} / {room.MaxPlayers}
        </div>
      </div>
    )
  });

  return (
    <div className="container-fluid">
      <div className="row">
        <div className="col-md-3">
          <img src={gameInfo.ImgUrl} alt={gameInfo.Name} width="100%" />
          <h2>{gameInfo.Name}</h2>
          <p>{gameInfo.Description}</p>
          <FontAwesomeIcon icon="user" className="mr-2" />
          <span>{gameInfo.MaxPlayers}</span>
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

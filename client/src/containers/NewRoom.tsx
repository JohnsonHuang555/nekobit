import React, { useState, useEffect } from 'react';
import { RouteComponentProps } from 'react-router';
import GameApi from '../api/GameApi';
import RoomApi from '../api/RoomApi';

type Game = {
  _id: string;
  ImgUrl: string;
  Name: string
}

const NewRoom = (props: RouteComponentProps) => {
  const [roomTitle, setRoomTitle] = useState('');
  const [roomPassword, setRoomPassword] = useState('');
  const [gameName, setGameName] = useState('');
  const [games, setGames] = useState([]);

  useEffect(() => {
    const getAllGames = async () => {
      const data = await GameApi.getAllGames();
      setGames(data);
    }
    getAllGames();
  }, [props]);

  const loadedGames = games.map((game: Game) => <option key={game._id}>{game.Name}</option>);

  const submitHandler = (e: any) => {
    e.preventDefault();
    RoomApi.createRoom({
      title: roomTitle,
      gameName: gameName,
      userList: [],
    });
  };

  return (
    <div className="container-fluid">
      <div className="col-md-6">
        <h4 className="center mb-4">NewGame</h4>
        <div className="form-group">
          <label htmlFor="exampleInputEmail1">Room title</label>
          <input
            type="text"
            id="room-title"
            className="form-control mb-4"
            placeholder="please enter room title..."
            required
            onChange={(e) => setRoomTitle(e.target.value)}
          />
        </div>
        <div className="form-group">
          <label htmlFor="exampleInputEmail1">Room password</label>
          <input
            type="password"
            id="room-password"
            className="form-control mb-4"
            placeholder="please enter room password..."
            onChange={(e) => setRoomPassword(e.target.value)}
          />
        </div>
        <div className="form-group">
          <label htmlFor="exampleInputEmail1">Choose game</label>
          <select className="form-control mb-4" onChange={(e) => setGameName(e.target.value)}>
            <option value="">please choose game</option>
            {loadedGames}
          </select>
        </div>
        <button type="submit" className="btn btn-primary" onClick={(e) => submitHandler(e)}>Create</button>
      </div>
    </div>
  )
}

export default NewRoom;

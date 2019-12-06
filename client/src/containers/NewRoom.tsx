import React, { useState, useEffect, useContext } from 'react';
import uuid from 'uuid';
import { RouteComponentProps } from 'react-router';
import GameApi from '../api/GameApi';
import RoomApi from '../api/RoomApi';
import LoginModal from '../components/LoginModal';
import { TGame } from '../types/Game';
import {AppContext} from '../contexts/AppContext';

const NewRoom = (props: RouteComponentProps) => {
  const [roomTitle, setRoomTitle] = useState('');
  const [roomPassword, setRoomPassword] = useState('');
  const [gameID, setGameID] = useState('');
  const [games, setGames] = useState([]);
  const [isShowLoginModal, setIsShowLoginModal] = useState(false);

  const {
    userInfo,
    setUserInfo
  } = useContext(AppContext);

  useEffect(() => {
    const getAllGames = async () => {
      const data = await GameApi.getAllGames();
      setGames(data);
    }
    getAllGames();

    if (!userInfo) {
      setIsShowLoginModal(true);
    }
  }, [props]);

  const loadedGames = games.map((game: TGame) => <option key={game._id} value={game._id}>{game.name}</option>);

  const submitHandler = async (e: any) => {
    e.preventDefault();
    const roomId = await RoomApi.createRoom({
      gameID,
      password: roomPassword,
      title: roomTitle,
      userList: []
    });
    props.history.push({
      pathname: `/room/${roomId}`,
      state: {
        isMaster: true
      }
    })
  };

  const onLogin = (name: string) => {
    const userData = {
      name,
      id: uuid(),
      account: "",
      isLogin: true,
    }
    setUserInfo(userData);
    setIsShowLoginModal(false);
  }

  return (
    <>
      <LoginModal show={isShowLoginModal} onLogin={onLogin}/>
      <div className="container-fluid">
        <div className="col-md-6">
          <h4 className="center mb-4">NewGame</h4>
          <form onSubmit={submitHandler}>
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
              <select className="form-control mb-4" onChange={(e) => setGameID(e.target.value)}>
                <option value="">please choose game</option>
                {loadedGames}
              </select>
            </div>
            <button type="submit" className="btn btn-primary">Create</button>
          </form>
        </div>
      </div>
    </>
  )
}

export default NewRoom;

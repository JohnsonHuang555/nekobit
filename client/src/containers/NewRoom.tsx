import React, { useState, useEffect, useContext } from 'react';
import { RouteComponentProps } from 'react-router';
import GameApi from '../api/GameApi';
import RoomApi from '../api/RoomApi';
import { GameProps } from '../types/Game';
import LoginModal from '../components/LoginModal';
import { AppContext } from '../contexts/AppContext';

const NewRoom = (props: RouteComponentProps) => {
  const { user, fastLogin } = useContext(AppContext);

  const [roomTitle, setRoomTitle] = useState('');
  const [roomPassword, setRoomPassword] = useState('');
  const [gameName, setGameName] = useState('');
  const [games, setGames] = useState([]);
  const [isShowLoginModal, setIsShowLoginModal] = useState(false);

  useEffect(() => {
    const getAllGames = async () => {
      const data = await GameApi.getAllGames();
      setGames(data);
    }
    getAllGames();
  }, [props]);

  useEffect(() => {
    if (!user.isLogin) {
      setIsShowLoginModal(true)
    }
  }, [user])

  const loadedGames = games.map((game: GameProps) => <option key={game._id}>{game.Name}</option>);

  const submitHandler = (e: any) => {
    e.preventDefault();
    RoomApi.createRoom({
      gameName,
      userList: [],
      title: roomTitle,
    });
  };

  const onLogin = (name: string) => {
    fastLogin(name)
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
              <select className="form-control mb-4" onChange={(e) => setGameName(e.target.value)}>
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

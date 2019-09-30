import React, { useEffect, useState } from 'react';
import { RouteProps } from 'react-router-dom';
import GameApi from '../api/GameApi';

const Home = (props:RouteProps) => {
  const [games, setGames] = useState([]);

  useEffect(() => {
    const getAllGames = async () => {
      const data = await GameApi.getAllGames();
      setGames(data);
    }
    getAllGames();
  }, [props])

  return (
    <div className="container-fluid game-container">
      <div className="row">
        {games.map((g:any) => (
          <div className="col-md-2" key={g._id}>
            <div className="game-card">
              <img className="game-image" src={g.imgUrl} alt="象棋" width="100%" />
              <div className="game-name">{g.name}</div>
            </div>
          </div>
        ))}
      </div>
    </div>
  )
}

export default Home;

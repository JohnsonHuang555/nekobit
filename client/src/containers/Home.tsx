import React, { useEffect, useState } from 'react';
import { RouteComponentProps } from 'react-router-dom';
import GameApi from '../api/GameApi';

type Game = {
  _id: string;
  ImgUrl: string;
  Name: string
}

const Home = (props: RouteComponentProps) => {
  const [games, setGames] = useState([]);

  useEffect(() => {
    const getAllGames = async () => {
      const data = await GameApi.getAllGames();
      setGames(data);
    }
    getAllGames();
  }, [props]);

  const chooseGameHandler = (gameName: string) => {
    props.history.push(`/game/${gameName}`);
  };

  return (
    <div className="container-fluid">
      <div className="row">
        {games.map((game: Game) => (
          <div className="col-md-2" key={game._id}>
            <div className="game-card" onClick={() => chooseGameHandler(game.Name)}>
              <img className="game-image" src={game.ImgUrl} alt="象棋" width="100%" />
              <div className="game-name">{game.Name}</div>
            </div>
          </div>
        ))}
      </div>
    </div>
  )
}

export default Home;

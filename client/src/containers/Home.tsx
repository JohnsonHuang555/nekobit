import React, { useContext } from 'react';
import { RouteComponentProps } from 'react-router-dom';
import { AppContext } from '../contexts/AppContext';
import { GameProps } from '../types/Game';

const Home = (props: RouteComponentProps) => {
  const { games } = useContext(AppContext);

  const chooseGameHandler = (gameName: string) => {
    props.history.push(`/game/${gameName}`);
  };

  return (
    <div className="container-fluid">
      <div className="row">
        {games.map((game: GameProps) => (
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

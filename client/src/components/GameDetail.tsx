import React from 'react';
import { TGame } from '../types/Game';
import { TRoom } from '../types/Room';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';

type GameDetailProps = {
  gameInfo: TGame;
  rooms: TRoom[];
  playNow: () => void;
};

const GameDetail = (props: GameDetailProps) => {
  const {
    gameInfo,
    rooms,
    playNow,
  } = props;

  return (
    <div id="game" className="container-fluid">
      <div className="container">
        <div className="section-heading">
          <h2>遊戲介紹</h2>
        </div>
        <div className="row main">
          <div className="col-md-7 game-image">
            <img src={gameInfo.imgURL} alt={gameInfo.name} width="100%" />
          </div>
          <div className="col-md-5 game-info">
            <div className="game_title">
              <h2>{gameInfo.name}</h2>
            </div>
            <div className="game_description">
              <p>{gameInfo.description}</p>
            </div>
            <div className="counts">
              <div className="players">
                <FontAwesomeIcon icon="user-friends" /><b>遊戲需求人數：{gameInfo.maxPlayers}</b>
              </div>
              <div className="rooms">
                <FontAwesomeIcon icon="chess" /><b>總房間數：{rooms ? rooms.length : 0}</b>
              </div>
            </div>
            <div className="buttons">
              <button className="new_room">
                <FontAwesomeIcon icon="door-open" />
                <b>New Room</b>
              </button>
              <button className="play_now" onClick={playNow}>
                <FontAwesomeIcon icon="gamepad" />
                <b>Play Now</b>
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default GameDetail;
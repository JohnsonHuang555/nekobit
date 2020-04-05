import React from 'react';
import Router from 'next/router';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import {
  faUserFriends,
  faChess,
  faDoorOpen,
  faGamepad,
  faStar,
  faHome
} from '@fortawesome/free-solid-svg-icons';
import { TRoom } from 'src/types/Room';
import { TGame } from 'src/features/main/domain/models/Game';

type GameDetailProps = {
  gameInfo: TGame;
  rooms: TRoom[];
  onShowModal: () => void;
  playNow: () => void;
};

const GameDetail = (props: GameDetailProps) => {
  const {
    gameInfo,
    rooms,
    onShowModal,
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
            <img src={`${gameInfo.imgURL}/game.png`} alt={gameInfo.name} width="100%" />
          </div>
          <div className="col-md-5 game-info">
            <div className="game_title">
              <h2>{gameInfo.name}</h2>
            </div>
            <div className="game_stars">
              <FontAwesomeIcon icon={faStar} />
              <FontAwesomeIcon icon={faStar} />
              <FontAwesomeIcon icon={faStar} />
              <FontAwesomeIcon icon={faStar} />
              <FontAwesomeIcon icon={faStar} />
              <span className="points">10 分</span>
            </div>
            <div className="game_description">
              <p>{gameInfo.description}</p>
            </div>
            <div className="counts">
              <div className="players">
                <FontAwesomeIcon icon={faUserFriends} /><b>遊戲需求人數：{gameInfo.maxPlayers}</b>
              </div>
              <div className="rooms">
                <FontAwesomeIcon icon={faChess} /><b>總房間數：{rooms ? rooms.length : 0}</b>
              </div>
            </div>
            <div className="buttons">
              <button className="new_room" onClick={onShowModal}>
                <FontAwesomeIcon icon={faDoorOpen} />
                <b>New Room</b>
              </button>
              <button className="play_now" onClick={playNow}>
                <FontAwesomeIcon icon={faGamepad} />
                <b>Play Now</b>
              </button>
            </div>
            <div className="back_to_home" onClick={() => Router.push('/')}>
              <FontAwesomeIcon icon={faHome} />
              <span>回遊戲大廳</span>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default GameDetail;
import React from 'react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import {
  faUserFriends,
  faChess,
  faDoorOpen,
  faGamepad
} from '@fortawesome/free-solid-svg-icons';
import { TGame } from 'src/types/Game';
import { TRoom } from 'src/types/Room';

type GameDetailProps = {
  gameInfo: TGame;
  rooms: TRoom[];
  createRoom: (d: any) => void;
  playNow: () => void;
};

const GameDetail = (props: GameDetailProps) => {
  const {
    gameInfo,
    rooms,
    createRoom,
    playNow,
  } = props;

  const onCreateRoom = () => {
    createRoom({
      roomPassword: "",
      roomTitle: "Play game",
      roomMode: 0,
    });
  }

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
                <FontAwesomeIcon icon={faUserFriends} /><b>遊戲需求人數：{gameInfo.maxPlayers}</b>
              </div>
              <div className="rooms">
                <FontAwesomeIcon icon={faChess} /><b>總房間數：{rooms ? rooms.length : 0}</b>
              </div>
            </div>
            <div className="buttons">
              <button className="new_room" onClick={onCreateRoom}>
                <FontAwesomeIcon icon={faDoorOpen} />
                <b>New Room</b>
              </button>
              <button className="play_now" onClick={playNow}>
                <FontAwesomeIcon icon={faGamepad} />
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
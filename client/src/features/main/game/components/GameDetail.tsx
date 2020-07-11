import React from 'react';
import Router from 'next/router';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import {
  faUserFriends,
  faChess,
  faDoorOpen,
  faGamepad,
  faHome
} from '@fortawesome/free-solid-svg-icons';
import { TGame } from 'src/features/main/domain/models/Game';
import { Grid, Box, Button } from '@material-ui/core';
import styles from '@styles/components/gameDetail.module.scss';

type GameDetailProps = {
  gameInfo: TGame;
  roomsCount: number;
  onShowModal: () => void;
  playNow: () => void;
};

const GameDetail = (props: GameDetailProps) => {
  const {
    gameInfo,
    roomsCount = 0,
    onShowModal,
    playNow,
  } = props;

  return (
    <Box className={styles.gameDetail}>
      <div className="section-heading">
        <h2>遊戲介紹</h2>
      </div>
      <Grid container spacing={3}>
        <Grid item xs={7}>
          <img src={`${gameInfo.imgUrl}/game.png`} alt={gameInfo.name} width="100%" />
        </Grid>
        <Grid item xs={5}>
          <Box className={styles.gameName}>{gameInfo.name}</Box>
          <Box className={styles.description}>{gameInfo.description}</Box>
          <Grid container className={styles.info}>
            <Grid item xs={6}>
              <FontAwesomeIcon icon={faUserFriends} className={styles.icon} />
              <span>遊戲需求人數：</span>
              <span>{gameInfo.maxPlayers}</span>
            </Grid>
            <Grid item xs={6}>
              <FontAwesomeIcon icon={faChess} className={styles.icon} />
              <span>總房間數：</span>
              <span>{roomsCount}</span>
            </Grid>
          </Grid>
          <Grid container spacing={3}>
            <Grid item xs={6}>
              <Button
                variant="contained"
                color="primary"
                size="large"
                onClick={onShowModal}
                fullWidth
                startIcon={
                  <FontAwesomeIcon icon={faDoorOpen} />
                }
              >
                New Room
              </Button>
            </Grid>
            <Grid item xs={6}>
              <Button
                variant="contained"
                color="primary"
                size="large"
                onClick={playNow}
                fullWidth
                startIcon={
                  <FontAwesomeIcon icon={faGamepad} />
                }
              >
                PlayNow
              </Button>
            </Grid>
          </Grid>
        </Grid>
      </Grid>
      {/* <div className="row main">
          <div className="col-md-7 game-image">
            <img src={`${gameInfo.imgUrl}/game.png`} alt={gameInfo.name} width="100%" />
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
                <FontAwesomeIcon icon={faChess} /><b>總房間數：{roomsCount}</b>
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
        </div> */}
    </Box>
  );
};

export default GameDetail;

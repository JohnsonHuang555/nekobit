import React from 'react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { Grid, Box, Button } from '@material-ui/core';
import {
  faUserFriends,
  faDoorOpen,
  faGamepad,
} from '@fortawesome/free-solid-svg-icons';
import { TGame } from 'src/features/main/domain/models/Game';
import styles from '@styles/components/gameDetail.module.scss';

type GameDetailProps = {
  gameInfo: TGame;
  onShowModal: () => void;
  playNow: () => void;
};

const GameDetail = (props: GameDetailProps) => {
  const {
    gameInfo,
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
    </Box>
  );
};

export default GameDetail;

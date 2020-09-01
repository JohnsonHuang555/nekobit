import React from 'react';
import { Box, Grid } from '@material-ui/core';
import styles from '@styles/components/gameBoy.module.scss';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faCaretLeft, faCaretDown, faCaretRight, faCaretUp, faCircle } from '@fortawesome/free-solid-svg-icons';

const GameBoy = () => {
  return (
    <Box className={styles['game-boy']}>
      <Box className={styles['screen-area']}>
        <Box className={styles['power']}>
          <Box className={styles['indicator']}>
            <Box className={styles['light']}></Box>
            <span className={styles['arc-1']}></span>
            <span className={styles['arc-2']}></span>
            <span className={styles['arc-3']}></span>
          </Box>
          POWER
        </Box>
        <Box className={styles['screen']}></Box>
        <Box className={styles['logo-area']}>
          <Box className={styles['logo']}>GAME BOY</Box>
          <Box className={styles['c']}>C</Box>
          <Box className={styles['o1']}>O</Box>
          <Box className={styles['l']}>L</Box>
          <Box className={styles['o2']}>O</Box>
          <Box className={styles['r']}>R</Box>
        </Box>
      </Box>
      <Box className={styles['control-area']}>
        <Box className={styles['nintendo']}>Nintendo</Box>
        <Grid container>
          <Grid item xs={6} className={styles['arrow-keys']}>
            <Box>
              <FontAwesomeIcon className={styles['arrow-up']} icon={faCaretUp} />
            </Box>
            <Box className={styles['middle-row']}>
              <Box className={styles['arrow-left']}>
                <FontAwesomeIcon icon={faCaretLeft} />
              </Box>
              <Box className={styles['center']}>
                <FontAwesomeIcon className={styles['circle']} icon={faCircle} />
              </Box>
              <Box className={styles['arrow-right']}>
                <FontAwesomeIcon icon={faCaretRight} />
              </Box>
            </Box>
            <Box className={styles['arrow-down']}>
              <FontAwesomeIcon icon={faCaretDown} />
            </Box>
          </Grid>
          <Grid item xs={6} className={styles['a-b']}>
            <Box className={styles['a']}>A</Box>
            <Box className={styles['b']}>B</Box>
          </Grid>
        </Grid>
        <Box className={styles['select-start']}>
          <Box className={styles['select']}>
            <Box className={styles['button']}></Box>
            <span>SELECT</span>
          </Box>
          <Box className={styles['start']}>
            <Box className={styles['button']}></Box>
            <span>START</span>
          </Box>
        </Box>
      </Box>
    </Box>
  );
};

export default GameBoy;
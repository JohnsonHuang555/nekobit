import React from 'react';
import { Box } from '@material-ui/core';
import styles from '@styles/components/gameBoy.module.scss';

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
        <Box className={styles['']}></Box>
      </Box>
    </Box>
  );
};

export default GameBoy;
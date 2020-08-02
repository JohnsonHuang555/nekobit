import React from 'react';
import { Box, Grid } from '@material-ui/core';
import { HiddenProps } from './Hidden';
import MapItem from '../MapItem';
import { GameModeCode } from 'src/features/games/domain/models/ChineseChess';
import GameMap, { GameType } from 'src/components/GameMap';
import styles from '@styles/games/chineseChessStandard.module.scss';

type StandardProps = Omit<HiddenProps, 'onFlip'>

const Standard = (props: StandardProps) => {
  const {
    chesses,
    selectedChess,
    yourTurn,
    playerSide,
    onSelect,
    onMove,
    onEat,
  } = props;
  const chessMap = () => {
    let map = [];
    for (let y = 0; y < 10; y++) {
      for (let x = 0; x < 9; x++) {
        const chessInfo = [...chesses].find(c => {
          return c.locationX === x && c.locationY === y && c.alive;
        });

        const onMapClick = () => {
          if (!chessInfo && selectedChess) {
            onMove(x, y);
          }
        };

        const onChessClick = () => {
          if (!chessInfo || !yourTurn) { return; }
          if (playerSide === chessInfo.side) {
            onSelect(chessInfo);
          } else if (selectedChess && selectedChess.side !== chessInfo.side) {
            onEat(chessInfo);
          }
        };

        const isSelected = (): boolean => {
          if (selectedChess && chessInfo) {
            if (selectedChess.id === chessInfo.id) {
              return true;
            }
          }
          return false;
        };

        map.push(
          <MapItem
            mode={GameModeCode.Standard}
            key={`x-${x}/y-${y}`}
            isSelected={isSelected()}
            chessInfo={chessInfo}
            onMapClick={onMapClick}
            onChessClick={onChessClick}
          />
        )
      }
    }
    return map;
  };

  return (
    <Box width="100vh" className={styles['standard-mode']}>
      <GameMap gameType={GameType.ChineseChess} className={styles['map']} />
      <Grid container className={styles['chesses']}>
        {chessMap()}
      </Grid>
    </Box>
  )
};

export default Standard;

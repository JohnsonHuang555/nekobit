import React from 'react';
import { TChineseChess, ChessSide, GameModeCode } from 'src/features/games/domain/models/ChineseChess';
import MapItem from '../MapItem';
import { Box, Grid } from '@material-ui/core';
import styles from '@styles/games/chineseChess.module.scss';

export type HiddenProps = {
  chesses: TChineseChess[];
  yourTurn: boolean;
  selectedChess?: TChineseChess;
  playerSide: ChessSide;
  onSelect: (chess: TChineseChess) => void;
  onMove: (targetX: number, targetY: number) => void;
  onEat: (targetChess: TChineseChess) => void;
  onFlip: (id: number) => void;
}

const Hidden = (props: HiddenProps) => {
  const {
    chesses,
    yourTurn,
    selectedChess,
    playerSide,
    onSelect,
    onEat,
    onFlip,
    onMove,
  } = props;

  const chessMap = () => {
    let map = [];
    for (let y = 0; y < 4; y++) {
      for (let x = 0; x < 8; x++) {
        const chessInfo = [...chesses].find(c => {
          return c.locationX === x && c.locationY === y && c.alive
        });

        const onMapClick = () => {
          if (!chessInfo && selectedChess) {
            onMove(x, y);
          }
        };

        const onChessClick = () => {
          if (!chessInfo || !yourTurn) { return; }
          if (!chessInfo.isFlipped) {
            onFlip(chessInfo.id);
          } else if (playerSide === chessInfo.side) {
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
            mode={GameModeCode.Hidden}
            key={`x-${x}/y-${y}`}
            isSelected={isSelected()}
            chessInfo={chessInfo}
            onMapClick={onMapClick}
            onChessClick={onChessClick}
          />
        );
      }
    }
    return map;
  }

  return (
    <Box width="100vh">
      <Grid container className={styles.container}>
        {chessMap()}
      </Grid>
    </Box>
  )
};

export default Hidden;

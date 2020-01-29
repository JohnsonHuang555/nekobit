import React from 'react';
import { IChineseChess } from 'src/interfaces/ChineseChess';
import { TChineseChess } from 'src/types/ChineseChess';
import ChessMapItem from '../ChessMapItem';

interface StandardProps extends IChineseChess {
  mode: number;
}

const Standard = (props: StandardProps) => {
  const {
    gameData,
    mode,
    selectedChess,
    onSelect,
    onMove,
    onEat,
  } = props;

  // override methods
  const onSelectOverride = (id: number, chessInfo: TChineseChess) => {

  }

  const onMoveOverride = () => {

  }

  const onEatOverride = () => {

  }

  const isInRange = () => {

  }

  const chessMap = () => {
    let map = [];
    for (let y = 0; y < 11; y++) {
      for (let x = 0; x < 9; x++) {
        const chessInfo = [...gameData].find((g: TChineseChess) => {
          return g.locationX === x + 1 && g.locationY === y + 1;
        });

        let isSelected = false
        if (chessInfo && selectedChess && selectedChess.id === chessInfo.id) {
          isSelected = true;
        }

        const checkChessExist = () => {
          if (chessInfo) return;
          // onMoveOverride(i + 1);
        }

        map.push(
          <div key={`x${x}y${y}`} className={`map-item ` + (mode === 1 && 'standard')} onClick={checkChessExist}>
            <ChessMapItem
              chessInfo={chessInfo ? chessInfo : undefined}
              isSelected={isSelected}
              onSelect={(id: number) => onSelectOverride(id, chessInfo)}
            />
          </div>
        );
      }
    }
    return map;
  }

  return (
    <>
      {chessMap()}
    </>
  );
};

export default Standard;

import React from 'react';
import { IChineseChess } from 'src/interfaces/ChineseChess';
import { TChineseChess } from 'src/types/ChineseChess';
import ChessMapItem from '../ChessMapItem';

interface StandardProps extends IChineseChess {
  mode: number;
}

type TRange = {
  x: number;
  y: number;
}

const Standard = (props: StandardProps) => {
  const {
    gameData,
    mode,
    selectedChess,
    onClearSelectedChess,
    onSelect,
    onMove,
    onEat,
  } = props;

  // override methods
  const onSelectOverride = (id: number, chessInfo: TChineseChess) => {
    onSelect(id);
  }

  const onMoveOverride = (newLocationX: number, newLocationY: number) => {
    if (!selectedChess || !isInRange(newLocationX, newLocationY)) {
      return;
    }
    console.log('moving')
    // onMove({
    //   chessID: selectedChess.id,
    // });
    // onClearSelectedChess();
  }

  const onEatOverride = () => {

  }

  // 判斷每種棋子步法
  const isInRange = (locationX: number, locationY: number): boolean => {
    if (!selectedChess) return false;
    switch (selectedChess.name) {
      case '帥':
      case '將':
      case '卒':
      case '兵':
      case '車' || '俥':
        const currentLocations = [selectedChess.locationX, selectedChess.locationY];
        if (currentLocations.includes(locationX) || currentLocations.includes(locationY)) {
          return true;
        }
      case '馬' || '傌':
        const horseRange: TRange[] = [];
        ['xAdd', 'xMinus', 'yAdd', 'yMinus'].forEach(item => {
          switch (item) {
            case 'xAdd':
              // 拐馬腳
              const xAddObstacle = findChessByLocation(selectedChess.locationX + 1, selectedChess.locationY);
              if (xAddObstacle) break;

              const xAdd = selectedChess.locationX + 2;
              horseRange.push({x: xAdd, y: selectedChess.locationY + 1});
              horseRange.push({x: xAdd, y: selectedChess.locationY - 1});
              break;
            case 'xMinus':
              const xMinusObstacle = findChessByLocation(selectedChess.locationX - 1, selectedChess.locationY);
              if (xMinusObstacle) break;

              const xMinus = selectedChess.locationX - 2;
              horseRange.push({x: xMinus, y: selectedChess.locationY + 1});
              horseRange.push({x: xMinus, y: selectedChess.locationY - 1});
              break;
            case 'yAdd':
              const yAddObstacle = findChessByLocation(selectedChess.locationX, selectedChess.locationY + 1);
              if (yAddObstacle) break;

              const yAdd = selectedChess.locationY + 2;
              horseRange.push({x: selectedChess.locationX + 1, y: yAdd});
              horseRange.push({x: selectedChess.locationX - 1, y: yAdd});
              break;
            case 'yMinus':
              const yMinusObstacle = findChessByLocation(selectedChess.locationX, selectedChess.locationY - 1);
              if (yMinusObstacle) break;

              const yMinus = selectedChess.locationY - 2;
              horseRange.push({x: selectedChess.locationX + 1, y: yMinus});
              horseRange.push({x: selectedChess.locationX - 1, y: yMinus});
              break;
          }
        });
        const canHorseMove = horseRange.find(item => {
          return item.x === locationX && item.y === locationY;
        });
        return canHorseMove ? true : false;
      case '象' || '像':
        // 不可過河
        if (selectedChess.name === '象' && selectedChess.locationY > 5) {
          return false;
        }
        if (selectedChess.name === '像' as string && selectedChess.locationY < 6) {
          return false;
        }
        const elephantRange: TRange[] = [];
        ['left', 'right'].forEach(item => {
          switch (item) {
            case 'left':
              const topLeftObstacle = findChessByLocation(selectedChess.locationX - 1, selectedChess.locationY - 1);
              const bottomLeftObstacle = findChessByLocation(selectedChess.locationX - 1, selectedChess.locationY + 1);
              const leftX = selectedChess.locationX - 2;
              if (!topLeftObstacle) {
                elephantRange.push({x: leftX, y: selectedChess.locationY - 2});
              }
              if (!bottomLeftObstacle) {
                elephantRange.push({x: leftX, y: selectedChess.locationY + 2});
              }
              break;
            case 'right':
              const topRightObstacle = findChessByLocation(selectedChess.locationX + 1, selectedChess.locationY - 1);
              const bottomRightObstacle = findChessByLocation(selectedChess.locationX + 1, selectedChess.locationY + 1);
              const rightX = selectedChess.locationX + 2;
              if (!topRightObstacle) {
                elephantRange.push({x: rightX, y: selectedChess.locationY - 2});
              }
              if (!bottomRightObstacle) {
                elephantRange.push({x: rightX, y: selectedChess.locationY + 2});
              }
              break;
          }
        });
        const canElephantMove = elephantRange.find(item => {
          return item.x === locationX && item.y === locationY;
        });
        return canElephantMove ? true : false;
      case '士' || '仕':
      case '包' || '炮':
      default:
        return false;
    }
  }

  const chessMap = () => {
    let map = [];
    for (let y = 0; y < 10; y++) {
      for (let x = 0; x < 9; x++) {
        const chessInfo = [...gameData].find((g: TChineseChess) => {
          return g.locationX === x + 1 && g.locationY === y + 1;
        }) as TChineseChess;

        let isSelected = false
        if (chessInfo && selectedChess && selectedChess.id === chessInfo.id) {
          isSelected = true;
        }

        const checkChessExist = () => {
          if (chessInfo) return;
          onMoveOverride(x + 1, y + 1);
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

  const findChessByLocation = (x: number, y:number) => {
    return gameData.find(chess => {
      return chess.locationX === x && chess.locationY === y;
    });
  }

  return (
    <>
      {chessMap()}
    </>
  );
};

export default Standard;

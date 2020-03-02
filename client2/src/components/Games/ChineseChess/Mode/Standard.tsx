import React from 'react';
import { IChineseChess } from 'src/interfaces/ChineseChess';
import { TChineseChess } from 'src/types/ChineseChess';
import ChessMapItem from 'src/components/Games/ChineseChess/ChessMapItem';

interface StandardProps extends IChineseChess {
  mode: number;
  isRotate: boolean;
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
    isRotate
  } = props;

  // override methods
  const onSelectOverride = (id: number, chessInfo: TChineseChess) => {
    if (selectedChess && id !== selectedChess.id && selectedChess.side !== chessInfo.side) {
      onEatOverride(selectedChess, chessInfo);
      return;
    }
    onSelect(id);
  }

  const onMoveOverride = (newLocationX: number, newLocationY: number) => {
    if (!selectedChess || !isInRange(newLocationX, newLocationY)) {
      return;
    }
    onMove({
      chessID: selectedChess.id,
      locationX: newLocationX,
      locationY: newLocationY,
    });
    onClearSelectedChess();
  }

  const onEatOverride = (nowChess: TChineseChess, targetChess: TChineseChess) => {
    if (!selectedChess || !isInRange(targetChess.locationX, targetChess.locationY)) {
      return;
    }

    onEat({
      chessID: nowChess.id,
      locationX: targetChess.locationX,
      locationY: targetChess.locationY,
      eatenChessID: targetChess.id,
    });
  }

  // 判斷每種棋子步法
  const isInRange = (locationX: number, locationY: number): boolean => {
    if (!selectedChess) return false;
    switch (selectedChess.name) {
      case '帥':
      case '將':
        if (selectedChess.name === '將' && locationY > 3) {
          return false;
        } else if (selectedChess.name === '帥' && locationY < 8) {
          return false;
        }

        const kingRange: TRange[] = [];
        kingRange.push({x: selectedChess.locationX + 1, y: selectedChess.locationY});
        kingRange.push({x: selectedChess.locationX - 1, y: selectedChess.locationY});
        kingRange.push({x: selectedChess.locationX, y: selectedChess.locationY + 1});
        kingRange.push({x: selectedChess.locationX, y: selectedChess.locationY - 1});

        if (selectedChess.locationX === locationX) {

        }
        const canKingMove = kingRange.find(item => {
          return item.x === locationX && item.y === locationY;
        });
        return canKingMove ? true : false;
      case '卒':
        const blackSoldierRange: TRange[] = [];
        blackSoldierRange.push({x: selectedChess.locationX, y: selectedChess.locationY + 1});
        if (selectedChess.locationY > 5) {
          blackSoldierRange.push({x: selectedChess.locationX + 1, y: selectedChess.locationY});
          blackSoldierRange.push({x: selectedChess.locationX - 1, y: selectedChess.locationY});
        }
        const canBlackSoldierMove = blackSoldierRange.find(item => {
          return item.x === locationX && item.y === locationY;
        });
        return canBlackSoldierMove ? true : false;
      case '兵':
        const redSoldierRange: TRange[] = [];
        redSoldierRange.push({x: selectedChess.locationX, y: selectedChess.locationY - 1});
        if (selectedChess.locationY < 6) {
          redSoldierRange.push({x: selectedChess.locationX + 1, y: selectedChess.locationY});
          redSoldierRange.push({x: selectedChess.locationX - 1, y: selectedChess.locationY});
        }
        const canRedSoldierMove = redSoldierRange.find(item => {
          return item.x === locationX && item.y === locationY;
        });
        return canRedSoldierMove ? true : false;
      case '車':
      case '俥':
      case '包':
      case '炮':
        let canMove = true;
        if (selectedChess.locationX === locationX) {
          for (let i = 0; i < Math.abs(selectedChess.locationY - locationY) - 1; i++) {
            let hasChessY;
            if (locationY > selectedChess.locationY) {
              hasChessY = findChessByLocation(locationX, selectedChess.locationY + i + 1);
            } else {
              hasChessY = findChessByLocation(locationX, locationY + i + 1);
            }
            if (hasChessY) {
              canMove = false;
              return canMove;
            }
          }
        }
        if (selectedChess.locationY === locationY) {
          for (let i = 0; i < Math.abs(selectedChess.locationX - locationX) - 1; i++) {
            let hasChessX;
            if (locationX > selectedChess.locationX) {
              hasChessX = findChessByLocation(selectedChess.locationX + i + 1, locationY);
            } else {
              hasChessX = findChessByLocation(locationX + i + 1, locationY);
            }
            if (hasChessX) {
              canMove = false;
              return canMove;
            }
          }
        }
        return canMove;
      case '馬':
      case '傌':
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
      case '象':
      case '相':
        // 不可過河
        if (selectedChess.name === '象' && selectedChess.locationY > 5) {
          return false;
        }
        if (selectedChess.name === '相' && selectedChess.locationY < 6) {
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
      case '士':
      case '仕':
        const soldierRange: TRange[] = [];
        if (locationX > 6 || locationX < 4) {
          return false;
        }
        if (selectedChess.name === '士' && locationY > 3) {
          return false;
        } else if (selectedChess.name === '仕' && locationY < 8) {
          return false;
        }

        soldierRange.push({x: selectedChess.locationX - 1, y: selectedChess.locationY + 1});
        soldierRange.push({x: selectedChess.locationX - 1, y: selectedChess.locationY + 1});
        soldierRange.push({x: selectedChess.locationX + 1, y: selectedChess.locationY - 1});
        soldierRange.push({x: selectedChess.locationX + 1, y: selectedChess.locationY + 1});
        const canSoldierMove = soldierRange.find(item => {
          return item.x === locationX && item.y === locationY;
        });
        return canSoldierMove ? true : false;
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
              isRotate={isRotate}
            />
          </div>
        );
      }
    }
    return map;
  }

  const findChessByLocation = (x: number, y:number) => {
    console.log(x, y)
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

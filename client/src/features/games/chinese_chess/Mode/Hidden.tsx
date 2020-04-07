import React from 'react';
import { IChineseChess } from 'src/interfaces/ChineseChess';
import { TChineseChess } from 'src/types/ChineseChess';
import ChessMapItem from 'src/features/games/chinese_chess/ChessMapItem';

export enum PlayerSide {
  Red = 'RED',
  Black = 'BLACK',
}

interface HiddenProps extends IChineseChess {
  yourSide: string;
  onFlip: (id: number) => void;
}

const Hidden = (props: HiddenProps) => {
  const {
    gameData,
    yourSide,
    selectedChess,
    isYouTurn,
    onClearSelectedChess,
    onFlip,
    onSelect,
    onMove,
    onEat,
    onGameOver,
  } = props;

  // override methods
  const onSelectOverride = (id: number, chessInfo: TChineseChess) => {
    if (chessInfo.isFliped) {
      if (selectedChess && id !== selectedChess.id && selectedChess.side !== chessInfo.side) {
        onEatOverride(selectedChess, chessInfo);
        return;
      }
      onSelect(id);
    } else {
      onFlip(id);
    }
  }

  const onMoveOverride = (newLocation: number) => {
    if (!selectedChess || !isInRangeCross(selectedChess.location, newLocation)) {
      return;
    }
    onMove({
      newLocation,
      chessID: selectedChess.id,
    });
    onClearSelectedChess();
  }

  const onEatOverride = (nowChess: TChineseChess, targetChess: TChineseChess) => {
    if (checkEatCondition(nowChess, targetChess)) {
      // 是包的話不用做十字行走範圍判斷
      if (nowChess.name === '炮' || nowChess.name === '包') {
        onEat({
          chessID: nowChess.id,
          newLocation: targetChess.location,
          eatenChessID: targetChess.id
        });
        onClearSelectedChess();
      } else {
        if (isInRangeCross(nowChess.location, targetChess.location)) {
          onEat({
            chessID: nowChess.id,
            newLocation: targetChess.location,
            eatenChessID: targetChess.id
          });
          onClearSelectedChess();
        }
      }
    }
  }

  // 除了包之外其餘走法判斷範圍
  const isInRangeCross = (nowLocation: number, targetLocation: number): boolean => {
    const range = [];
    // first line x - 8
    const firstLineMedian = nowLocation - 8;
    if (nowLocation > 8) {
      range.push(firstLineMedian);
    }
    // second line x
    const secondLineMedian = nowLocation;
    range.push(secondLineMedian - 1);
    range.push(secondLineMedian + 1);
    // third line x + 8
    const thirdLineMedian = nowLocation + 8;
    if (nowLocation + 8 < 32) {
      range.push(thirdLineMedian);
    }

    if (range.includes(targetLocation)) {
      return true;
    }
    return false;
  }

  // 判斷階級條件
  const checkEatCondition = (nowChess: TChineseChess, targetChess: TChineseChess): boolean => {
    // 卒吃帥
    if (nowChess.name === '卒' || nowChess.name === '兵') {
      if (targetChess.name === '帥' || targetChess.name === '將') {
        return true;
      }
      if (targetChess.name === '炮' || targetChess.name === '包') {
        return false;
      }
    }

    // 帥不能吃卒
    if (nowChess.name === '帥' || nowChess.name === '將') {
      if (targetChess.name === '卒' || targetChess.name === '兵') {
        return false;
      }
    }

    if (nowChess.name === '炮' || nowChess.name === '包') {
      // 判斷小於8是 X 軸
      const isXAxis = Math.abs(targetChess.location - nowChess.location) < 8 ? true : false;
      if (isXAxis) {
        // X axis
        if (nowChess.location > targetChess.location) {
          const chess = [...gameData].filter((c: TChineseChess) => {
            return c.location < nowChess.location && c.location > targetChess.location
          })
          return chess.length === 1 ? true : false;
        } else {
          const chess = [...gameData].filter((c: TChineseChess) => {
            return c.location > nowChess.location && c.location < targetChess.location
          })
          return chess.length === 1 ? true : false;
        }
      } else {
        // Y axis
        if (nowChess.location > targetChess.location) {
          const temp = [];
          for (let i = targetChess.location + 8; i < nowChess.location; i+=8) {
            if ((gameData[i] as TChineseChess).location !== -1) {
              temp.push(i)
            }
          }
          return temp.length === 1 ? true : false;
        } else {
          const temp = [];
          for (let i = nowChess.location + 8; i < targetChess.location; i+=8) {
            if ((gameData[i] as TChineseChess).location !== -1) {
              temp.push(i)
            }
          }
          return temp.length === 1 ? true : false;
        }
      }
    }

    if (nowChess.rank >= targetChess.rank) {
      return true;
    }
    return false;
  }

  const chessMap = () => {
    // 檢查是否遊戲結束
    const remainRedChesses = [...gameData].filter((g: TChineseChess) => {
      return g.location !== -1 && g.side === 'RED';
    });
    const remainBlackChesses = [...gameData].filter((g: TChineseChess) => {
      return g.location !== -1 && g.side === 'BLACK';
    });

    if (remainRedChesses.length === 0 || remainBlackChesses.length === 0) {
      onGameOver();
    }

    let map = [];
    for (let i = 0; i < 32; i++) {
      const chessInfo = [...gameData].find((g: TChineseChess) => {
        return g.location === i + 1;
      }) as TChineseChess;

      let isSelected = false
      if (chessInfo && selectedChess && selectedChess.id === chessInfo.id) {
        isSelected = true;
      }

      const checkChessExist = () => {
        if (chessInfo) return;
        onMoveOverride(i + 1);
      }

      map.push(
        <div key={i} className="map-item" onClick={checkChessExist}>
          <ChessMapItem
            chessInfo={chessInfo ? chessInfo : undefined}
            isSelected={isSelected}
            onSelect={(id: number) => onSelectOverride(id, chessInfo)}
          />
        </div>
      )
    }
    return map;
  }

  const playerSide = {
    [PlayerSide.Red]: <span className="player-side">玩家為 紅方</span>,
    [PlayerSide.Black]: <span className="player-side">玩家為 黑方</span>
  }

  return (
    <div className="hidden">
      <div className="game-header">
        {playerSide[yourSide as PlayerSide]}
        {isYouTurn && <span>你的回合</span>}
      </div>
      {chessMap()}
      <div className="game-footer"></div>
    </div>
  );
};

export default Hidden;

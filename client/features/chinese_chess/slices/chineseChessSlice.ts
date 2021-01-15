import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import { CheckMoveRange } from "helpers/checkMoveRange";
import { ChessName } from "../domain/models/ChessName";
import { ChineseChess } from "../domain/models/ChineseChess";
import { PlayerSide } from "../domain/models/PlayerSide";
import { Range } from "../../../helpers/checkMoveRange";

export type CheckMate = {
  isCheck: boolean;
  playerId: string;
};

export type State = {
  chineseChess: ChineseChess[];
  playerSide: PlayerSide;
  canMove: boolean;
  canEat: boolean;
  checkMate: CheckMate;

  // 到後端的參數
  targetId: number;
  targetX: number;
  targetY: number;
};

export type CaseReducer = {
  setGameData: (
    state: State,
    action: PayloadAction<{
      chineseChess: ChineseChess[];
      playerSide: PlayerSide;
    }>
  ) => void;
  setCanMove: (
    state: State,
    action: PayloadAction<{
      chessId: number;
      targetX: number;
      targetY: number;
      chesses: ChineseChess[];
      mode: string;
    }>
  ) => void;
  setCanEat: (
    state: State,
    action: PayloadAction<{
      chessId: number;
      targeId: number;
      targetName: ChessName;
      targetRank: number;
      targetX: number;
      targetY: number;
      chesses: ChineseChess[];
      mode: string;
    }>
  ) => void;
  setCheckMate: (state: State, action: PayloadAction<CheckMate>) => void;
  reset: (state: State) => void;
};

const chineseChessSlice = createSlice<State, CaseReducer>({
  name: "chinese_chess",
  initialState: {
    chineseChess: [],
    playerSide: {},
    canMove: false,
    canEat: false,
    checkMate: {
      isCheck: false,
      playerId: "",
    },
    targetId: -1,
    targetX: -1,
    targetY: -1,
  },
  reducers: {
    setGameData: (
      state: State,
      action: PayloadAction<{
        chineseChess: ChineseChess[];
        playerSide: PlayerSide;
      }>
    ) => {
      state.chineseChess = action.payload.chineseChess;
      state.playerSide = action.payload.playerSide;
    },
    setCanMove: (
      state: State,
      action: PayloadAction<{
        chessId: number;
        targetX: number;
        targetY: number;
        chesses: ChineseChess[];
        mode: string;
      }>
    ) => {
      const { chessId, targetX, targetY, chesses, mode } = action.payload;
      const nowChess = chesses.find((c) => c.id === chessId);
      if (nowChess) {
        const { locationX, locationY } = nowChess;
        switch (mode) {
          case "hidden": {
            const range = CheckMoveRange.shortCross(locationX, locationY);
            const isInRange = CheckMoveRange.isInRange(range, targetX, targetY);
            if (isInRange) {
              state.canMove = true;
              state.targetX = targetX;
              state.targetY = targetY;
            }
            break;
          }
          case "standard": {
            const canMove = checkMove(chesses, nowChess, targetX, targetY);
            if (canMove) {
              state.canMove = true;
              state.targetX = targetX;
              state.targetY = targetY;
            }
            break;
          }
        }
      }
    },
    setCanEat: (
      state: State,
      action: PayloadAction<{
        chessId: number;
        targeId: number;
        targetName: ChessName;
        targetRank: number;
        targetX: number;
        targetY: number;
        chesses: ChineseChess[];
        mode: string;
      }>
    ) => {
      const {
        chessId,
        targeId,
        targetName,
        targetRank,
        targetX,
        targetY,
        chesses,
        mode,
      } = action.payload;
      const nowChess = chesses.find((c) => c.id === chessId);

      if (nowChess) {
        const { name, rank, locationX, locationY } = nowChess;
        // 炮 要判斷中間是否隔一個
        if (name === ChessName.CannonsRed || name === ChessName.CannonsBlack) {
          let middleChesses: ChineseChess[] = [];
          if (locationX === targetX) {
            middleChesses = chesses.filter((c) => {
              return (
                c.locationX === targetX &&
                c.locationY > Math.min(targetY, locationY) &&
                c.locationY < Math.max(targetY, locationY) &&
                c.alive
              );
            });
          } else if (locationY === targetY) {
            middleChesses = chesses.filter((c) => {
              return (
                c.locationY === targetY &&
                c.locationX > Math.min(targetX, locationX) &&
                c.locationX < Math.max(targetX, locationX) &&
                c.alive
              );
            });
          }
          console.log(middleChesses);
          // 判斷中間是不是一定隔一個
          if (middleChesses.length === 1) {
            state.canEat = true;
            state.targetId = targeId;
          }
          return;
        }
        switch (mode) {
          case "hidden": {
            // 判斷可不可以吃
            const isEatable = (): boolean => {
              if (
                (name === ChessName.SoldiersBlack ||
                  name === ChessName.SoldiersRed) &&
                (targetName === ChessName.KingBlack ||
                  targetName === ChessName.KingRed)
              ) {
                // 卒可以吃帥，兵可以吃將
                return true;
              } else if (
                (name === ChessName.KingBlack || name === ChessName.KingRed) &&
                (targetName === ChessName.SoldiersBlack ||
                  targetName === ChessName.SoldiersRed)
              ) {
                // 帥不可以吃卒，將不可以吃兵
                return false;
              } else if (
                (name === ChessName.SoldiersBlack ||
                  name === ChessName.SoldiersRed) &&
                (targetName === ChessName.CannonsBlack ||
                  targetName === ChessName.CannonsRed)
              ) {
                // 卒不可以吃炮，兵不可以吃包
                return false;
              } else {
                // 其餘則以階級判斷
                if (rank >= targetRank) {
                  return true;
                }
                return false;
              }
            };
            // 其餘判斷 階級 + 步法
            const range = CheckMoveRange.shortCross(
              nowChess.locationX,
              nowChess.locationY
            );
            const isInRange = CheckMoveRange.isInRange(range, targetX, targetY);
            if (isInRange && isEatable()) {
              state.canEat = true;
              state.targetId = targeId;
            }
            break;
          }
          case "standard": {
            const isInRange = checkMove(chesses, nowChess, targetX, targetY);
            if (
              nowChess.name === ChessName.KingBlack ||
              nowChess.name === ChessName.KingRed
            ) {
              let hasChesses = false;
              for (
                let i = 0;
                i < Math.abs(nowChess.locationY - targetY) - 1;
                i++
              ) {
                let hasChessY;
                if (targetY > nowChess.locationY) {
                  hasChessY = findChessByLocation(
                    chesses,
                    targetX,
                    nowChess.locationY + i + 1
                  );
                } else {
                  hasChessY = findChessByLocation(
                    chesses,
                    targetX,
                    targetY + i + 1
                  );
                }
                if (hasChessY && hasChessY.alive) {
                  hasChesses = true;
                  break;
                }
              }
              if (!hasChesses) {
                state.canEat = true;
                state.targetId = targeId;
              }
            } else if (
              isInRange ||
              nowChess.name === ChessName.CannonsBlack ||
              nowChess.name === ChessName.CannonsRed
            ) {
              state.canEat = true;
              state.targetId = targeId;
            }
          }
        }
      }
    },
    setCheckMate: (state: State, action: PayloadAction<CheckMate>) => {
      state.checkMate = action.payload;
    },
    reset: (state: State) => {
      state.canEat = false;
      state.canMove = false;
      state.targetId = -1;
      state.targetX = -1;
      state.targetY = -1;
    },
  },
  extraReducers: {},
});

const findChessByLocation = (
  chesses: ChineseChess[],
  x: number,
  y: number
): ChineseChess => {
  return chesses.find(
    (chess: ChineseChess) => chess.locationX === x && chess.locationY === y
  ) as ChineseChess;
};

const checkMove = (
  chesses: ChineseChess[],
  selectedChess: ChineseChess,
  targetX: number,
  targetY: number
): boolean => {
  let canMove = false;
  switch (selectedChess.name) {
    case ChessName.KingBlack: {
      // 限制範圍
      if (targetY > 2) {
        return false;
      }
      const range = CheckMoveRange.shortCross(
        selectedChess.locationX,
        selectedChess.locationY
      );
      canMove = CheckMoveRange.isInRange(range, targetX, targetY);
      break;
    }
    case ChessName.KingRed: {
      if (targetY < 7) {
        return false;
      }
      const range = CheckMoveRange.shortCross(
        selectedChess.locationX,
        selectedChess.locationY
      );
      canMove = CheckMoveRange.isInRange(range, targetX, targetY);
      break;
    }
    case ChessName.SoldiersBlack: {
      const range: Range[] = [];
      range.push({
        x: selectedChess.locationX,
        y: selectedChess.locationY + 1,
      });
      if (targetY > 4) {
        // 可左右移動
        range.push({
          x: selectedChess.locationX + 1,
          y: selectedChess.locationY,
        });
        range.push({
          x: selectedChess.locationX - 1,
          y: selectedChess.locationY,
        });
      }
      canMove = CheckMoveRange.isInRange(range, targetX, targetY);
      break;
    }
    case ChessName.SoldiersRed: {
      const range: Range[] = [];
      range.push({
        x: selectedChess.locationX,
        y: selectedChess.locationY - 1,
      });
      if (targetY < 5) {
        // 可左右移動
        range.push({
          x: selectedChess.locationX + 1,
          y: selectedChess.locationY,
        });
        range.push({
          x: selectedChess.locationX - 1,
          y: selectedChess.locationY,
        });
      }
      canMove = CheckMoveRange.isInRange(range, targetX, targetY);
      break;
    }
    case ChessName.ChariotsBlack:
    case ChessName.ChariotsRed:
    case ChessName.CannonsBlack:
    case ChessName.CannonsRed: {
      let tempCanMove = true;
      if (selectedChess.locationX === targetX) {
        for (
          let i = 0;
          i < Math.abs(selectedChess.locationY - targetY) - 1;
          i++
        ) {
          let hasChessY;
          if (targetY > selectedChess.locationY) {
            hasChessY = findChessByLocation(
              chesses,
              targetX,
              selectedChess.locationY + i + 1
            );
          } else {
            hasChessY = findChessByLocation(chesses, targetX, targetY + i + 1);
          }
          if (hasChessY && hasChessY.alive) {
            tempCanMove = false;
            break;
          }
        }
      } else if (selectedChess.locationY === targetY) {
        for (
          let i = 0;
          i < Math.abs(selectedChess.locationX - targetX) - 1;
          i++
        ) {
          let hasChessX;
          if (targetX > selectedChess.locationX) {
            hasChessX = findChessByLocation(
              chesses,
              selectedChess.locationX + i + 1,
              targetY
            );
          } else {
            hasChessX = findChessByLocation(chesses, targetX + i + 1, targetY);
          }
          if (hasChessX && hasChessX.alive) {
            tempCanMove = false;
            break;
          }
        }
      } else {
        tempCanMove = false;
      }
      canMove = tempCanMove;
      break;
    }
    case ChessName.HorsesBlack:
    case ChessName.HorsesRed: {
      const range: Range[] = [];
      ["xAdd", "xMinus", "yAdd", "yMinus"].forEach((item) => {
        switch (item) {
          case "xAdd":
            // 拐馬腳
            const xAddObstacle = findChessByLocation(
              chesses,
              selectedChess.locationX + 1,
              selectedChess.locationY
            );
            if (xAddObstacle) break;
            const xAdd = selectedChess.locationX + 2;
            range.push({ x: xAdd, y: selectedChess.locationY + 1 });
            range.push({ x: xAdd, y: selectedChess.locationY - 1 });
            break;
          case "xMinus":
            const xMinusObstacle = findChessByLocation(
              chesses,
              selectedChess.locationX - 1,
              selectedChess.locationY
            );
            if (xMinusObstacle) break;
            const xMinus = selectedChess.locationX - 2;
            range.push({ x: xMinus, y: selectedChess.locationY + 1 });
            range.push({ x: xMinus, y: selectedChess.locationY - 1 });
            break;
          case "yAdd":
            const yAddObstacle = findChessByLocation(
              chesses,
              selectedChess.locationX,
              selectedChess.locationY + 1
            );
            if (yAddObstacle) break;
            const yAdd = selectedChess.locationY + 2;
            range.push({ x: selectedChess.locationX + 1, y: yAdd });
            range.push({ x: selectedChess.locationX - 1, y: yAdd });
            break;
          case "yMinus":
            const yMinusObstacle = findChessByLocation(
              chesses,
              selectedChess.locationX,
              selectedChess.locationY - 1
            );
            if (yMinusObstacle) break;
            const yMinus = selectedChess.locationY - 2;
            range.push({ x: selectedChess.locationX + 1, y: yMinus });
            range.push({ x: selectedChess.locationX - 1, y: yMinus });
            break;
        }
      });
      canMove = CheckMoveRange.isInRange(range, targetX, targetY);
      break;
    }
    case ChessName.MinisterBlack:
    case ChessName.MinisterRed: {
      const range: Range[] = [];
      // 不可過河
      if (selectedChess.name === ChessName.MinisterBlack && targetY > 4) {
        break;
      }
      if (selectedChess.name === ChessName.MinisterRed && targetY < 5) {
        break;
      }
      ["left", "right"].forEach((item) => {
        switch (item) {
          case "left":
            const topLeftObstacle = findChessByLocation(
              chesses,
              selectedChess.locationX - 1,
              selectedChess.locationY - 1
            );
            const bottomLeftObstacle = findChessByLocation(
              chesses,
              selectedChess.locationX - 1,
              selectedChess.locationY + 1
            );
            const leftX = selectedChess.locationX - 2;
            if (!topLeftObstacle) {
              range.push({ x: leftX, y: selectedChess.locationY - 2 });
            }
            if (!bottomLeftObstacle) {
              range.push({ x: leftX, y: selectedChess.locationY + 2 });
            }
            break;
          case "right":
            const topRightObstacle = findChessByLocation(
              chesses,
              selectedChess.locationX + 1,
              selectedChess.locationY - 1
            );
            const bottomRightObstacle = findChessByLocation(
              chesses,
              selectedChess.locationX + 1,
              selectedChess.locationY + 1
            );
            const rightX = selectedChess.locationX + 2;
            if (!topRightObstacle) {
              range.push({ x: rightX, y: selectedChess.locationY - 2 });
            }
            if (!bottomRightObstacle) {
              range.push({ x: rightX, y: selectedChess.locationY + 2 });
            }
            break;
        }
      });
      canMove = CheckMoveRange.isInRange(range, targetX, targetY);
      break;
    }
    case ChessName.GuardsBlack:
    case ChessName.GuardsRed: {
      if (targetX > 5 || targetX < 3) {
        canMove = false;
        break;
      }
      if (selectedChess.name === ChessName.GuardsBlack && targetY > 2) {
        canMove = false;
        break;
      } else if (selectedChess.name === ChessName.GuardsRed && targetY < 7) {
        canMove = false;
        break;
      }

      const range = CheckMoveRange.diagonal(
        selectedChess.locationX,
        selectedChess.locationY
      );
      canMove = CheckMoveRange.isInRange(range, targetX, targetY);
      break;
    }
  }
  return canMove;
};

export const {
  setGameData,
  setCanMove,
  setCanEat,
  setCheckMate,
  reset,
} = chineseChessSlice.actions;

export default chineseChessSlice.reducer;

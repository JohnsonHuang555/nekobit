import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import { CheckMoveRange } from "helpers/checkMoveRange";
import { ChessName } from "../domain/models/ChessName";
import { ChineseChess } from "../domain/models/ChineseChess";
import { PlayerSide } from "../domain/models/PlayerSide";

export type State = {
  chineseChess: ChineseChess[];
  playerSide: PlayerSide;
  canMove: boolean;
  canEat: boolean;
  isGameOver: boolean;

  // 到後端的參數
  targetId: number;
  targetX: number;
  targetY: number;
}

export type CaseReducer = {
  setGameData: (state: State, action: PayloadAction<{
    chineseChess: ChineseChess[];
    playerSide: PlayerSide;
  }>) => void;
  setCanMove: (state: State, action: PayloadAction<{
    chessId: number;
    targetX: number;
    targetY: number;
    chesses: ChineseChess[];
  }>) => void;
  setCanEat: (state: State, action: PayloadAction<{
    chessId: number;
    targeId: number;
    targetName: ChessName;
    targetRank: number;
    targetX: number;
    targetY: number;
    chesses: ChineseChess[];
  }>) => void;
  setGameOver: (state: State, action: PayloadAction<boolean>) => void;
  reset: (state: State) => void;
};

const chineseChessSlice = createSlice<State, CaseReducer>({
  name: 'chinese_chess',
  initialState: {
    chineseChess: [],
    playerSide: {},
    canMove: false,
    canEat: false,
    isGameOver: false,
    targetId: -1,
    targetX: -1,
    targetY: -1,
  },
  reducers: {
    setGameData: (state: State, action: PayloadAction<{
      chineseChess: ChineseChess[];
      playerSide: PlayerSide;
    }>) => {
      state.chineseChess = action.payload.chineseChess;
      state.playerSide = action.payload.playerSide;
    },
    setCanMove: (state: State, action: PayloadAction<{
      chessId: number;
      targetX: number;
      targetY: number;
      chesses: ChineseChess[];
    }>) => {
      const {
        chessId,
        targetX,
        targetY,
        chesses,
      } = action.payload;
      const nowChess = chesses.find(c => c.id === chessId);
      if (nowChess) {
        const { locationX, locationY } = nowChess;
        const range = CheckMoveRange.shortCross(locationX, locationY);
        const isInRange = CheckMoveRange.isInRange(range, targetX, targetY);
        if (isInRange) {
          state.canMove = true;
          state.targetX = targetX;
          state.targetY = targetY;
        }
      }
    },
    setCanEat: (state: State, action: PayloadAction<{
      chessId: number;
      targeId: number;
      targetName: ChessName;
      targetRank: number;
      targetX: number;
      targetY: number;
      chesses: ChineseChess[];
    }>) => {
      const {
        chessId,
        targeId,
        targetName,
        targetRank,
        targetX,
        targetY,
        chesses,
      } = action.payload;
      const nowChess = chesses.find(c => c.id === chessId);

      if (nowChess) {
        const { name, rank, locationX, locationY } = nowChess;

        // 判斷可不可以吃
        const isEatable = (): boolean => {
          if (
            (name === ChessName.SoldiersBlack || name === ChessName.SoldiersRed) &&
            (targetName === ChessName.KingBlack || targetName === ChessName.KingRed)
          ) {
            // 卒可以吃帥，兵可以吃將
            return true;
          } else if (
            (name === ChessName.KingBlack || name === ChessName.KingRed) &&
            (targetName === ChessName.SoldiersBlack || targetName === ChessName.SoldiersRed)
          ) {
            // 帥不可以吃卒，將不可以吃兵
            return false;
          } else if (
            (name === ChessName.SoldiersBlack || name === ChessName.SoldiersRed) &&
            (targetName === ChessName.CannonsBlack || targetName === ChessName.CannonsRed)
          ) {
            // 卒不可以吃炮，兵不可以吃包
            return false;
          } else {
            // 其餘則以階級判斷
            if (rank >= targetRank) {
              return true
            }
            return false
          }
        }

        // 炮 要判斷中間是否隔一個
        if (name === ChessName.CannonsRed || name === ChessName.CannonsBlack) {
          let middleChesses = [];
          if (locationX === targetX) {
            middleChesses = chesses.filter(c => {
              return c.locationX === targetX &&
                     c.locationY > Math.min(targetY, locationY) &&
                     c.locationY < Math.max(targetY, locationY) &&
                     c.alive
            });
          } else if (locationY === targetY) {
            middleChesses = chesses.filter(c => {
              return c.locationY === targetY &&
                     c.locationX > Math.min(targetX, locationX) &&
                     c.locationX < Math.max(targetX, locationX) &&
                     c.alive
            });
          }
          // 判斷中間是不是一定隔一個
          if (middleChesses.length === 1) {
            state.canEat = true;
            state.targetId = targeId;
          }
        } else {
          // 其餘判斷 階級 + 步法
          const range = CheckMoveRange.shortCross(nowChess.locationX, nowChess.locationY);
          const isInRange = CheckMoveRange.isInRange(range, targetX, targetY)
          if (isInRange && isEatable()) {
            state.canEat = true;
            state.targetId = targeId;
          }
        }
      }
    },
    setGameOver: (state: State, action: PayloadAction<boolean>) => {
      state.isGameOver = action.payload;
    },
    reset: (state: State) => {
      state.canEat = false;
      state.canMove = false;
      state.targetId = -1;
      state.targetX = -1;
      state.targetY = -1;
    }
  },
  extraReducers: {},
});

export const {
  setGameData,
  setCanMove,
  setCanEat,
  setGameOver,
  reset,
} = chineseChessSlice.actions;

export default chineseChessSlice.reducer;

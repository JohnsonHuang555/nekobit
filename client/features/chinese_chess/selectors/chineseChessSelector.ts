import { createSelector } from "@reduxjs/toolkit";
import { StoreState } from "store";

export const selectGameData = createSelector(
  (state: StoreState) => ({
    chineseChess: state.chineseChess.chineseChess,
    playerSide: state.chineseChess.playerSide,
  }),
  (state) => state,
);

export const selectCanMove = createSelector(
  (state: StoreState) => ({
    canMove: state.chineseChess.canMove,
    targetX: state.chineseChess.targetX,
    targetY: state.chineseChess.targetY,
  }),
  (state) => state,
);

export const selectCanEat = createSelector(
  (state: StoreState) => ({
    canEat: state.chineseChess.canEat,
    targeId: state.chineseChess.targetId,
  }),
  (state) => state,
);

export const selectIsGameOver = createSelector(
  (state: StoreState) => ({
    isGameOver: state.chineseChess.isGameOver,
  }),
  (state) => state,
);

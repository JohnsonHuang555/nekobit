import { createSelector } from "@reduxjs/toolkit";
import { StoreState } from "store";

export const selectGameData = createSelector(
  (state: StoreState) => ({
    chineseChess: state.chineseChess.chineseChess,
    playerSide: state.chineseChess.playerSide
  }),
  (state) => state,
);

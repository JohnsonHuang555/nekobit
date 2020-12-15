import { createSelector } from "@reduxjs/toolkit";
import { StoreState } from "store";
import { ChineseChess } from "../models/ChineseChess";
import { PlayerSide } from "../models/PlayerSide";

export type GameData = {
  chineseChess: ChineseChess[];
  playerSide: any;
}

export const selectGameData = createSelector(
  (state: StoreState) => ({
    gameData: state.rooms.selectedRoom?.gameData as GameData,
  }),
  (state) => state,
);

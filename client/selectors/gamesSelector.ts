import { createSelector } from "@reduxjs/toolkit";
import { StoreState } from "store";

export const selectGames = createSelector(
  (state: StoreState) => ({
    games: state.games.games,
  }),
  (state) => state,
);

export const selectGameInfo = createSelector(
  (state: StoreState) => ({
    selectedGame: state.games.selectedGame,
  }),
  (state) => state,
);

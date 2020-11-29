import { createSelector } from "@reduxjs/toolkit";
import { StoreState } from "store";

export const selectGames = createSelector(
  (state: StoreState) => ({
    games: state.games.games,
  }),
  (state) => state,
);

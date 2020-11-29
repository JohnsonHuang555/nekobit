import { createSelector } from "@reduxjs/toolkit";

export const selectGames = createSelector(
  (state: any) => ({
    games: state.games.games,
  }),
  (state) => state,
);

import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import { loadGameInfo, loadGames } from "domain/action/gamesAction";
import { Game } from "domain/models/Game";

export type initialState = {
  games: Game[];
  selectedGame?: Game;
  loading: boolean;
}

const gamesSlice = createSlice<initialState, any, any>({
  name: 'games',
  initialState: {
    games: [],
    selectedGame: undefined,
    loading: false,
  },
  reducers: {

  },
  extraReducers: {
    [loadGames.pending.toString()]: (state) => {
      state.loading = true;
    },
    [loadGames.fulfilled.toString()]: (state, action: PayloadAction<Game[]>) => {
      state.games = action.payload;
      state.loading = false;
    },
    [loadGameInfo.pending.toString()]: (state) => {
      state.loading = true;
    },
    [loadGameInfo.fulfilled.toString()]: (state, action: PayloadAction<Game>) => {
      state.selectedGame = action.payload;
      state.loading = false;
    },
  }
});

export default gamesSlice.reducer;

import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import { loadGames } from "actions/games/fetchAction";
import { Game } from "models/Game";

type initialState = {
  games: Game[];
  loading: boolean;
}

const gamesSlice = createSlice<initialState, any, any>({
  name: 'games',
  initialState: {
    games: [],
    loading: false,
  },
  reducers: {},
  extraReducers: {
    [loadGames.pending.toString()]: (state) => {
      state.games = [];
      state.loading = true;
    },
    [loadGames.fulfilled.toString()]: (state, action: PayloadAction<Game[]>) => {
      state.games = action.payload;
      state.loading = false;
    }
  }
});

export default gamesSlice.reducer;

import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import { loadGameInfo, loadGames } from "actions/gamesAction";
import { Game } from "domain/models/Game";

export type State = {
  games: Game[];
  selectedGame?: Game;
  loading: boolean;
};

export type CaseReducer = {};

const gamesSlice = createSlice<State, CaseReducer>({
  name: "games",
  initialState: {
    games: [],
    selectedGame: undefined,
    loading: false,
  },
  reducers: {},
  extraReducers: {
    [loadGames.pending.toString()]: (state) => {
      state.loading = true;
    },
    [loadGames.fulfilled.toString()]: (
      state,
      action: PayloadAction<Game[]>
    ) => {
      state.games = action.payload;
      state.loading = false;
    },
    [loadGameInfo.pending.toString()]: (state) => {
      state.loading = true;
    },
    [loadGameInfo.fulfilled.toString()]: (
      state,
      action: PayloadAction<Game>
    ) => {
      state.selectedGame = action.payload;
      state.loading = false;
    },
  },
});

export default gamesSlice.reducer;

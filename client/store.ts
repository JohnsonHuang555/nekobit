import { configureStore } from '@reduxjs/toolkit';
import gamesReducer from 'domain/slices/gamesSlice';

import { initialState as GamesState } from "domain/slices/gamesSlice";

export type StoreState = {
  games: GamesState;
}

export default configureStore({
  reducer: {
    games: gamesReducer,
  },
  devTools: true,
});

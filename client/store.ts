import { configureStore } from '@reduxjs/toolkit';
import gamesReducer from 'domain/slices/gamesSlice';
import roomsReducer from 'domain/slices/roomsSlice';

import { initialState as GamesState } from "domain/slices/gamesSlice";
import { initialState as RoomsState } from "domain/slices/roomsSlice";

export type StoreState = {
  games: GamesState;
  rooms: RoomsState;
}

export default configureStore({
  reducer: {
    games: gamesReducer,
    rooms: roomsReducer,
  },
  devTools: true,
});

import { configureStore } from '@reduxjs/toolkit';
import gamesReducer from 'slices/gamesSlice';
import roomsReducer from 'slices/roomsSlice';

import { initialState as GamesState } from "slices/gamesSlice";
import { initialState as RoomsState } from "slices/roomsSlice";

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

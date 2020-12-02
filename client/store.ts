import { configureStore } from '@reduxjs/toolkit';
import appReducer from 'slices/appSlice';
import gamesReducer from 'slices/gamesSlice';
import roomsReducer from 'slices/roomsSlice';

import { State as AppState } from "slices/appSlice";
import { State as GamesState } from "slices/gamesSlice";
import { State as RoomsState } from "slices/roomsSlice";

export type StoreState = {
  app: AppState;
  games: GamesState;
  rooms: RoomsState;
}

export default configureStore({
  reducer: {
    app: appReducer,
    games: gamesReducer,
    rooms: roomsReducer,
  },
  devTools: true,
});

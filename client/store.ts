import { configureStore } from '@reduxjs/toolkit';
import gamesReducer from 'domain/slices/gamesSlice';

export default configureStore({
  reducer: {
    games: gamesReducer,
  },
  devTools: true,
});

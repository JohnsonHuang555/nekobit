import { configureStore, getDefaultMiddleware  } from '@reduxjs/toolkit';
import appReducer from 'slices/appSlice';
import gamesReducer from 'slices/gamesSlice';
import roomsReducer from 'slices/roomsSlice';
import webSocketReducer from 'slices/webSocketSlice';
import chineseChessReducer from 'features/chinese_chess/slices/chineseChessSlice';

import { State as AppState } from "slices/appSlice";
import { State as GamesState } from "slices/gamesSlice";
import { State as RoomsState } from "slices/roomsSlice";
import { State as WebSocketState } from "slices/webSocketSlice";
import { State as ChineseChessState } from "features/chinese_chess/slices/chineseChessSlice";
import wsMiddleware from 'middlewares/socketMiddleware';

export type StoreState = {
  app: AppState;
  games: GamesState;
  rooms: RoomsState;
  webSocket: WebSocketState;
  chineseChess: ChineseChessState;
}

export default configureStore({
  reducer: {
    app: appReducer,
    games: gamesReducer,
    rooms: roomsReducer,
    webSocket: webSocketReducer,
    chineseChess: chineseChessReducer,
  },
  devTools: true,
  middleware: [...getDefaultMiddleware(), wsMiddleware]
});

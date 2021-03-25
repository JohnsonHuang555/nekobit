import { applyMiddleware, createStore } from 'redux';
import createSagaMiddleware from 'redux-saga';
import { createWrapper } from 'next-redux-wrapper';

// import appReducer from 'slices/appSlice';
// import gamesReducer from 'slices/gamesSlice';
// import roomsReducer from 'slices/roomsSlice';
// import webSocketReducer from 'slices/webSocketSlice';
// import chineseChessReducer from 'features/chinese_chess/slices/chineseChessSlice';

import { State as AppState } from 'slices/appSlice';
import { State as GamesState } from 'slices/gamesSlice';
import { State as RoomsState } from 'slices/roomsSlice';
import { State as WebSocketState } from 'slices/webSocketSlice';
import { State as ChineseChessState } from 'features/chinese_chess/slices/chineseChessSlice';
// import wsMiddleware from 'middlewares/socketMiddleware';

export type StoreState = {
  app: AppState;
  games: GamesState;
  rooms: RoomsState;
  webSocket: WebSocketState;
  chineseChess: ChineseChessState;
};

const bindMiddleware = (middleware) => {
  if (process.env.NODE_ENV !== 'production') {
    const { composeWithDevTools } = require('redux-devtools-extension');
    return composeWithDevTools(applyMiddleware(...middleware));
  }
  return applyMiddleware(...middleware);
};

export const makeStore = (context) => {
  const sagaMiddleware = createSagaMiddleware();
  const store = createStore(rootReducer, bindMiddleware([sagaMiddleware]));

  store.sagaTask = sagaMiddleware.run(rootSaga);

  return store;
};

export const wrapper = createWrapper(makeStore, { debug: true });

// export default configureStore({
//   reducer: {
//     app: appReducer,
//     games: gamesReducer,
//     rooms: roomsReducer,
//     webSocket: webSocketReducer,
//     chineseChess: chineseChessReducer,
//   },
//   devTools: true,
//   middleware: [...getDefaultMiddleware(), wsMiddleware],
// });

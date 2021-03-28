import { applyMiddleware, combineReducers, createStore } from 'redux';
import { HYDRATE, createWrapper } from 'next-redux-wrapper';
import game from 'reducers/gameReducer'

const bindMiddleware = (middleware: any) => {
  if (process.env.NODE_ENV !== 'production') {
    const { composeWithDevTools } = require('redux-devtools-extension');
    return composeWithDevTools(applyMiddleware(...middleware));
  }
  return applyMiddleware(...middleware);
};

const combinedReducer = combineReducers({
  game,
})

const reducer = (state: any, action: any) => {
  if (action.type === HYDRATE) {
    const nextState = {
      ...state, // use previous state
      ...action.payload, // apply delta from hydration
    }
    if (state.count.count) nextState.count.count = state.count.count // preserve count value on client side navigation
    return nextState
  } else {
    return combinedReducer(state, action)
  }
}

const initStore = () => {
  return createStore(reducer, bindMiddleware([]))
}

export const wrapper = createWrapper(initStore);

// import appReducer from 'slices/appSlice';
// import gamesReducer from 'slices/gamesSlice';
// import roomsReducer from 'slices/roomsSlice';
// import webSocketReducer from 'slices/webSocketSlice';
// import chineseChessReducer from 'features/chinese_chess/slices/chineseChessSlice';

// import { State as AppState } from 'slices/appSlice';
// import { State as GamesState } from 'slices/gamesSlice';
// import { State as RoomsState } from 'slices/roomsSlice';
// import { State as WebSocketState } from 'slices/webSocketSlice';
// import { State as ChineseChessState } from 'features/chinese_chess/slices/chineseChessSlice';
// import wsMiddleware from 'middlewares/socketMiddleware';

// export type StoreState = {
//   app: AppState;
//   games: GamesState;
//   rooms: RoomsState;
//   webSocket: WebSocketState;
//   chineseChess: ChineseChessState;
// };

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

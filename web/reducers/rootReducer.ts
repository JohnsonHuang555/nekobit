import { combineReducers } from 'redux';
import appReducer, { State as AppState } from 'reducers/appReducer';
import gameReducer, { State as GameState } from 'reducers/GameReducer';
import roomReducer, { State as RoomState } from 'reducers/roomReducer';

export type StoreState = {
  app: AppState;
  game: GameState;
  room: RoomState;
};

export default combineReducers({
  app: appReducer,
  game: gameReducer,
  room: roomReducer,
});

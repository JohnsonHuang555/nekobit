import { combineReducers } from 'redux';
import appReducer, { State as AppState } from 'reducers/appReducer';
import gameReducer, { State as GameState } from 'reducers/GameReducer';

export type StoreState = {
  app: AppState;
  game: GameState;
};

export default combineReducers({
  app: appReducer,
  game: gameReducer,
});

import { combineReducers } from 'redux';
import gameReducer, { State as GameState } from 'reducers/GameReducer';

export type StoreState = {
  game: GameState;
};

export default combineReducers({
  game: gameReducer,
});

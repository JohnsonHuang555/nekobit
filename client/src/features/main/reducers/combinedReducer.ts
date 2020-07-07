import { combineReducers } from 'redux';
import indexReducer, {
  State as IndexState
} from 'src/features/main/reducers/indexReducer';
import gameReducer, {
  State as GameState
} from 'src/features/main/reducers/gameReducer';

export interface CombinedState {
  index: IndexState;
  game: GameState;
}

const combinedReducer = combineReducers({
  index: indexReducer,
  game: gameReducer,
});

export default combinedReducer;

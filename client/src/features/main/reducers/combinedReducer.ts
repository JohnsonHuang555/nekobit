import { combineReducers } from 'redux';
import indexReducer, {
  State as IndexState
} from 'src/features/main/reducers/indexReducer';
import gameReducer, {
  State as GameState
} from 'src/features/main/reducers/gameReducer';
import roomReducer, {
  State as RoomState
} from 'src/features/main/reducers/roomReducer';

export interface CombinedState {
  index: IndexState;
  game: GameState;
  room: RoomState;
}

const combinedReducer = combineReducers({
  index: indexReducer,
  game: gameReducer,
  room: roomReducer,
});

export default combinedReducer;

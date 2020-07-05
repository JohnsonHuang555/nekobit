import { combineReducers } from 'redux';
import indexReducer, {
  State as IndexState
} from 'src/features/main/reducers/indexReducer';

export interface CombinedState {
  index: IndexState;
}

const combinedReducer = combineReducers({
  index: indexReducer,
});

export default combinedReducer;

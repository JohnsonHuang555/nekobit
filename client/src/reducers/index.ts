import { combineReducers } from 'redux';
import mainReducer, {
  CombinedState as MainCombinedState
} from 'src/features/main/reducers/combinedReducer';

export interface StoreState {
  main: MainCombinedState
};

export default combineReducers({
  main: mainReducer,
});

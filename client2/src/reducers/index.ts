import { combineReducers } from 'redux';
import mainReducer, {
  CombinedState as MainCombinedState
} from 'src/features/main/reducers/combinedReducer';
import appReducer, {
  State as AppState
} from 'src/reducers/appReducer';

export interface StoreState {
  main: MainCombinedState,
  app: AppState,
};

export default combineReducers({
  main: mainReducer,
  app: appReducer,
});

import { all } from 'redux-saga/effects';
import { loadGames } from './gameSaga';

function* rootSaga() {
  yield all([loadGames()]);
}

export default rootSaga;


import { all } from 'redux-saga/effects';
import indexSaga from './indexSaga';
import gameSaga from './gameSaga';

function* rootSaga() {
  yield all([
    indexSaga(),
    gameSaga(),
  ]);
}

export default rootSaga;

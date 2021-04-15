import { all } from 'redux-saga/effects';
import gameSaga from './gameSaga';
import roomSaga from './roomSaga';

function* rootSaga() {
  yield all([gameSaga(), roomSaga()]);
}

export default rootSaga;

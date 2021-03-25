import { all, call, delay, put, take, takeLatest } from 'redux-saga/effects';

function* loadGamesSaga() {
  try {
    const res = yield;
    const data = yield res.json();
    yield put(loadDataSuccess(data));
  } catch (err) {
    yield put(failure(err));
  }
}

function* rootSaga() {
  yield all([
    call(runClockSaga),
    takeLatest(actionTypes.LOAD_DATA, loadGamesSaga),
  ]);
}

export default rootSaga;

import { ActionType, loadedGames } from 'actions/gameAction';
import { getApi } from 'api/Fetcher';
import { GameFactory } from 'domain/factories/GameFactory';
import { all, call, put, takeLatest } from 'redux-saga/effects';
import { failure } from './actions/sharedAction'

export function* loadGames() {
  try {
    const data = yield call(() => getApi('/games')
      .then(res => {
        return GameFactory.createArrayFromNet(res.data);
      }));
    yield put(loadedGames(data))
  } catch (err) {
    yield put(failure(err))
  }
}

function* rootSaga() {
  yield all([
    takeLatest(ActionType.LOAD_GAMES, loadGames),
  ])
}

export default rootSaga;

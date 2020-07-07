import { call, put, takeEvery } from 'redux-saga/effects';
import { TGame } from '../domain/models/Game';
import { getApi } from 'src/api/Fetcher2';
import { ActionType as IndexActionType } from '../reducers/indexReducer';
import { GameFactory } from '../domain/factories/GameFactory';

function* getGames() {
  const games: TGame[] = yield call(() => getApi('/getAllGames')
    .then(response =>
      GameFactory.createArrayFromNet(response.data)
    ));
  yield put({ type: IndexActionType.GET_GAMES_SUCCESS, games });
}

function* indexSaga() {
  yield takeEvery(IndexActionType.GET_GAMES, getGames);
}

export default indexSaga;

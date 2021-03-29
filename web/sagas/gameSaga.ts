import { getApi } from 'fetcher';
import { ActionType, failure, loadGamesSuccess } from 'actions/GameAction';
import { GameFactory } from 'domain/factories/GameFactory';
import { Game } from 'domain/models/Game';
import { call, put, takeEvery } from 'redux-saga/effects';

function* loadGames() {
  try {
    const games: Game[] = yield call(() =>
      getApi('/games').then((res) => GameFactory.createArrayFromNet(res.data))
    );
    yield put(loadGamesSuccess(games));
  } catch (err) {
    yield put(failure(err));
  }
}

function* gameSaga() {
  yield takeEvery(ActionType.LOAD_GAMES, loadGames);
}

export default gameSaga;

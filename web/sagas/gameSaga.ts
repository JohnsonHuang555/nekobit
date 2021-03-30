import { getApi } from 'fetcher';
import { failure, loadGamesSuccess } from 'actions/GameAction';
import { GameFactory } from 'domain/factories/GameFactory';
import { Game } from 'domain/models/Game';
import { call, put } from 'redux-saga/effects';

export function* loadGames() {
  try {
    const games: Game[] = yield call(() =>
      getApi('/games').then((res) => GameFactory.createArrayFromNet(res.data))
    );
    yield put(loadGamesSuccess(games));
  } catch (err) {
    yield put(failure(err));
  }
}

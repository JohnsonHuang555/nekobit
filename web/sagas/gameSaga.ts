import { getApi } from 'fetcher';
import {
  ActionType,
  failure,
  loadGameInfoSuccess,
  loadGamesSuccess,
} from 'actions/GameAction';
import { GameFactory } from 'domain/factories/GameFactory';
import { Game } from 'domain/models/Game';
import { all, call, put, takeEvery } from 'redux-saga/effects';

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

function* loadGameInfo(action: any) {
  try {
    const game: Game = yield call(() =>
      getApi(`/games/${action.gamePack}`).then((res) =>
        GameFactory.createFromNet(res.data)
      )
    );
    yield put(loadGameInfoSuccess(game));
  } catch (err) {
    yield put(failure(err));
  }
}

export default function* gameSaga() {
  yield all([
    takeEvery(ActionType.LOAD_GAMES, loadGames),
    takeEvery(ActionType.LOAD_GAME_INFO, loadGameInfo),
  ]);
}

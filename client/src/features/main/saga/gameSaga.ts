import { getApi } from 'src/api/Fetcher2';
import { takeEvery, call, put } from 'redux-saga/effects';
import { ActionType as GameActionType, LoadGameInfoAction } from '../reducers/gameReducer';
import { TGame } from '../domain/models/Game';
import { GameFactory } from '../domain/factories/GameFactory';

function* getGameInfo(action: LoadGameInfoAction) {
  const gameInfo: TGame = yield call(() => getApi('/getGameInfo')
    .then(res =>
      GameFactory.createFromNet(res.data)
    ));
  yield put({ type: action.type, gameInfo })
}

function* gameSage() {
  yield takeEvery(GameActionType.GET_GAME_INFO, getGameInfo)
}

export default gameSage;

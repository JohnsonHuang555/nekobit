import { getApi } from 'src/api/Fetcher2';
import { takeEvery, call, put } from 'redux-saga/effects';
import { ActionType } from '../reducers/gameReducer';
import { TGame } from '../domain/models/Game';
import { GameFactory } from '../domain/factories/GameFactory';
import { GetGameInfoAction } from '../actions/gameAction';

function* getGameInfo(action: GetGameInfoAction) {
  const gameInfo: TGame = yield call(() => getApi(`/getGameInfo/${action.id}`)
    .then(res =>
      GameFactory.createFromNet(res.data)
    ));
  yield put({ type: action.type, gameInfo })
}

function* gameSage() {
  yield takeEvery(ActionType.GET_GAME_INFO, getGameInfo)
}

export default gameSage;

import { getApi, postApi } from 'src/api/Fetcher';
import { takeEvery, call, put } from 'redux-saga/effects';
import { ActionType } from '../reducers/gameReducer';
import { TGame } from '../domain/models/Game';
import { GameFactory } from '../domain/factories/GameFactory';
import { GetGameInfoAction, CreateRoomAction } from '../actions/gameAction';
import { TRoom } from '../domain/models/Room';
import { RoomFactory } from '../domain/factories/RoomFactory';

function* getGameInfo(action: GetGameInfoAction) {
  const gameInfo: TGame = yield call(() => getApi(`/getGameInfo?id=${action.id}`)
    .then(res =>
      GameFactory.createFromNet(res.data)
    ));
  yield put({ type: ActionType.GET_GAME_INFO_SUCCESS, gameInfo })
}

function* createRoom(action: CreateRoomAction) {
  const id: string = yield call(() => postApi('/createRoom', action.createRoomData)
    .then(res => res.data));
  yield put({ type: ActionType.CREATE_ROOM_SUCCESS, id });
}

function* getRooms() {
  const rooms: TRoom[] = yield call(() => getApi('/getRooms')
    .then(res =>
      RoomFactory.createArrayFromNet(res.data || [])
    ));
  yield put({ type: ActionType.GET_ROOMS_SUCCESS, rooms })
}

function* gameSage() {
  yield takeEvery(ActionType.GET_GAME_INFO, getGameInfo);
  yield takeEvery(ActionType.CREATE_ROOM, createRoom);
  yield takeEvery(ActionType.GET_ROOMS, getRooms);
}

export default gameSage;

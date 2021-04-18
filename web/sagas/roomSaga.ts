import { getApi, postApi } from 'fetcher';
import {
  ActionType,
  CreateRoomPayload,
  createRoomSuccess,
  loadRoomsSuccess,
} from 'actions/RoomAction';
import { all, call, put, takeEvery } from 'redux-saga/effects';
import { Room } from 'domain/models/Room';
import { failure } from 'actions/GameAction';
import { RoomFactory } from 'domain/factories/RoomFactory';

function* loadRooms(action: any) {
  try {
    const rooms: Room[] = yield call(() =>
      getApi(`/getRooms/${action.gamePack}`).then((res) =>
        RoomFactory.createArrayFromNet(res.data || [])
      )
    );
    yield put(loadRoomsSuccess(rooms));
  } catch (err) {
    yield put(failure(err));
  }
}

type Action = {
  type: ActionType.CREATE_ROOM;
  payload: CreateRoomPayload;
};

function* createRoom(action: Action) {
  const { name, mode, gamePack } = action.payload;
  try {
    const roomId: string = yield call(() =>
      postApi('/createRoom', {
        title: name,
        password: '', // TODO: password
        game_pack: gamePack,
        game_mode: mode,
      }).then((res) => res.data)
    );
    yield put(createRoomSuccess(roomId));
  } catch (err) {
    yield put(failure(err));
  }
}

export default function* roomSaga() {
  yield all([
    takeEvery(ActionType.LOAD_ROOMS, loadRooms),
    takeEvery(ActionType.CREATE_ROOM, createRoom),
  ]);
}

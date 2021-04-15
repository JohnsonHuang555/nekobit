import { getApi } from 'fetcher';
import { ActionType, loadRoomsSuccess } from 'actions/RoomAction';
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

export default function* roomSaga() {
  yield all([takeEvery(ActionType.LOAD_ROOMS, loadRooms)]);
}

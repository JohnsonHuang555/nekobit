import { getApi, postApi } from 'fetcher';
import {
  ActionType,
  checkJoinRoomSuccess,
  CreateRoomPayload,
  createRoomSuccess,
  loadRoomsSuccess,
} from 'actions/RoomAction';
import { all, call, put, takeEvery } from 'redux-saga/effects';
import { CheckJionRoomResponse, Room } from 'domain/models/Room';
import { failure } from 'actions/AppAction';
import { RoomFactory } from 'domain/factories/RoomFactory';
import { NetCheckJoinRoomRespose } from 'domain/remote/NetRoom';

type LoadRoomsAction = {
  type: ActionType.LOAD_ROOMS;
  gamePack: string;
};

function* loadRooms(action: LoadRoomsAction) {
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

type CreateRoomAction = {
  type: ActionType.CREATE_ROOM;
  payload: CreateRoomPayload;
};

function* createRoom(action: CreateRoomAction) {
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

type CheckJoinRoomAction = {
  type: ActionType.CHECK_JOIN_ROOM;
  roomId: string;
};

function* checkJoinRoom(action: CheckJoinRoomAction) {
  try {
    const { canJoin, message }: CheckJionRoomResponse = yield call(() =>
      getApi(`/checkJoinRoom/${action.roomId}`).then((res) => {
        const { can_join, message }: NetCheckJoinRoomRespose = res.data;
        return {
          message,
          canJoin: can_join,
        };
      })
    );
    yield put(checkJoinRoomSuccess(canJoin, message));
  } catch (err) {
    yield put(failure(err));
  }
}

export default function* roomSaga() {
  yield all([
    takeEvery(ActionType.LOAD_ROOMS, loadRooms),
    takeEvery(ActionType.CREATE_ROOM, createRoom),
    takeEvery(ActionType.CHECK_JOIN_ROOM, checkJoinRoom),
  ]);
}

import { ActionType } from 'actions/RoomAction';
import { Room } from 'domain/models/Room';

export type State = {
  rooms: Room[] | null;
  createdId: string;
};

const initialState: State = {
  rooms: null,
  createdId: '',
};

type LoadedRoomsAction = {
  type: ActionType.LOAD_ROOMS_SUCCESS;
  rooms: Room[];
};

type CreatedRoomAction = {
  type: ActionType.CREATE_ROOM_SUCCESS;
  roomId: string;
};

type Action = LoadedRoomsAction | CreatedRoomAction;

const reducer = (state = initialState, action: Action): State => {
  switch (action.type) {
    case ActionType.LOAD_ROOMS_SUCCESS: {
      return {
        ...state,
        rooms: action.rooms,
      };
    }
    case ActionType.CREATE_ROOM_SUCCESS: {
      return {
        ...state,
        createdId: action.roomId,
      };
    }
    default: {
      return state;
    }
  }
};

export default reducer;

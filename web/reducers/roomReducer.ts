import { ActionType } from 'actions/RoomAction';
import { Game } from 'domain/models/Game';
import { Room } from 'domain/models/Room';
import { SocketEvent } from 'domain/models/WebSocket';

export type State = {
  rooms: Room[] | null;
  createdId: string;
  checkJoinRoomObj?: {
    canJoin: boolean;
    message: string;
  };
  roomInfo?: Room;
  gameInfo?: Game;
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

type CheckJoinRoomAction = {
  type: ActionType.CHECK_JOIN_ROOM_SUCCESS;
  canJoin: boolean;
  message: string;
};

type JoinRoomAction = {
  type: SocketEvent.JoinRoom;
  roomInfo: Room;
  gameInfo: Game;
};

type Action =
  | LoadedRoomsAction
  | CreatedRoomAction
  | CheckJoinRoomAction
  | JoinRoomAction;

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
    case ActionType.CHECK_JOIN_ROOM_SUCCESS: {
      return {
        ...state,
        checkJoinRoomObj: {
          canJoin: action.canJoin,
          message: action.message,
        },
      };
    }
    case SocketEvent.JoinRoom: {
      return {
        ...state,
        roomInfo: action.roomInfo,
        gameInfo: action.gameInfo,
      };
    }
    default: {
      return state;
    }
  }
};

export default reducer;

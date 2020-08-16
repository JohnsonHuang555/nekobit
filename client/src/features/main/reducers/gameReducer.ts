import { TGame, TCreateRoom } from 'src/features/main/domain/models/Game';
import { TRoom } from 'src/features/main/domain/models/Room';

export type State = {
  gameInfo?: TGame;
  rooms: TRoom[];
  createRoomData: TCreateRoom;
  createdRoomId: string;
};

export const defaultState: State = {
  rooms: [],
  createRoomData: {
    title: '',
    mode: 1,
    gameID: '',
  },
  createdRoomId: '',
};

export enum ActionType {
  INITIAL_STATE = 'INITIAL_STATE',
  GET_GAME_INFO = 'GET_GAME_INFO',
  GET_GAME_INFO_SUCCESS = 'GET_GAME_INFO_SUCCESS',
  GET_ROOMS = 'GET_ROOMS',
  GET_ROOMS_SUCCESS = 'GET_ROOMS_SUCCESS',
  CREATING_ROOM = 'CREATING_ROOM',
  CREATE_ROOM = 'CREATE_ROOM',
  CREATE_ROOM_SUCCESS = 'CREATE_ROOM_SUCCESS',
}

export type InitialStateAction = {
  type: ActionType.INITIAL_STATE,
};

export type LoadGameInfoAction = {
  type: ActionType.GET_GAME_INFO_SUCCESS,
  gameInfo: TGame;
};

export type LoadRoomsAction = {
  type: ActionType.GET_ROOMS_SUCCESS,
  rooms: TRoom[];
};

export type CreatingRoomsAction = {
  type: ActionType.CREATING_ROOM,
  createRoomData: Partial<TCreateRoom>;
};

export type CreatedRoomAction = {
  type: ActionType.CREATE_ROOM_SUCCESS,
  id: string;
}

export type Action = InitialStateAction
                   | LoadGameInfoAction
                   | LoadRoomsAction
                   | CreatingRoomsAction
                   | CreatedRoomAction;

const reducer = (state: State = defaultState, action: Action): State => {
  switch (action.type) {
    case ActionType.INITIAL_STATE: {
      return defaultState;
    }
    case ActionType.GET_GAME_INFO_SUCCESS: {
      return {
        ...state,
        gameInfo: action.gameInfo,
      }
    }
    case ActionType.GET_ROOMS_SUCCESS: {
      return {
        ...state,
        rooms: action.rooms,
      }
    }
    case ActionType.CREATING_ROOM: {
      return {
        ...state,
        createRoomData: {
          ...state.createRoomData,
          ...action.createRoomData,
        }
      }
    }
    case ActionType.CREATE_ROOM_SUCCESS: {
      return {
        ...state,
        createdRoomId: action.id,
      }
    }
    default: {
      return state;
    }
  }
};

export default reducer;
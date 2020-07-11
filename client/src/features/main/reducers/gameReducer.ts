import { TGame } from 'src/features/main/domain/models/Game';
import { TRoom } from '../domain/models/Room';

export type State = {
  gameInfo?: TGame;
  rooms: TRoom[];
  isShowRoomList: boolean;
};

export const defaultState: State = {
  rooms: [],
  isShowRoomList: false,
};

export enum ActionType {
  GET_GAME_INFO = 'GET_GAME_INFO',
  GET_GAME_INFO_SUCCESS = 'GET_GAME_INFO_SUCCESS',
  GET_ROOMS = 'GET_ROOMS',
  SET_IS_SHOW_ROOM_LIST = 'SET_IS_SHOW_ROOM_LIST',
}

export type LoadGameInfoAction = {
  type: ActionType.GET_GAME_INFO_SUCCESS,
  gameInfo: TGame;
};

export type LoadRoomsAction = {
  type: ActionType.GET_ROOMS,
  rooms: TRoom[];
};

export type SetIsShowRoomListAction = {
  type: ActionType.SET_IS_SHOW_ROOM_LIST,
  show: boolean;
}

export type Action = LoadGameInfoAction | LoadRoomsAction | SetIsShowRoomListAction;

const reducer = (state: State = defaultState, action: Action): State => {
  switch (action.type) {
    case ActionType.GET_GAME_INFO_SUCCESS: {
      return {
        ...state,
        gameInfo: action.gameInfo,
      }
    }
    case ActionType.GET_ROOMS: {
      return {
        ...state,
        rooms: action.rooms,
      }
    }
    case ActionType.SET_IS_SHOW_ROOM_LIST: {
      return {
        ...state,
        isShowRoomList: action.show,
      }
    }
    default: {
      return state;
    }
  }
};

export default reducer;

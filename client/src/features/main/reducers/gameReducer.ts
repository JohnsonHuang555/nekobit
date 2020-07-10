import { TGame } from 'src/features/main/domain/models/Game';
import { TRoom } from '../domain/models/Room';

export type State = {
  gameInfo?: TGame;
  rooms: TRoom[];
};

export const defaultState: State = {
  rooms: [],
};

export enum ActionType {
  GET_GAME_INFO = 'GET_GAME_INFO',
  GET_GAME_INFO_SUCCESS = 'GET_GAME_INFO_SUCCESS',
  GET_ROOMS = 'GET_ROOMS',
}

export type LoadGameInfoAction = {
  type: ActionType.GET_GAME_INFO_SUCCESS,
  gameInfo: TGame;
};

export type LoadRoomsAction = {
  type: ActionType.GET_ROOMS,
  rooms: TRoom[];
};

export type Action = LoadGameInfoAction | LoadRoomsAction;

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
    default: {
      return state;
    }
  }
};

export default reducer;

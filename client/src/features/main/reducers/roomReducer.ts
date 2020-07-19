import { TRoom } from "../domain/models/Room";
import { TGameOver } from "src/types/Socket";

export type State = {
  roomInfo?: TRoom;
  gameOver: TGameOver;
};

export const defaultState: State = {
  gameOver: {
    isGameOver: false,
    winner: '',
  }
};

export enum ActionType {
  INITIAL_ROOM_INFO = 'INITIAL_ROOM_INFO',
  UPDATE_ROOM_INFO = 'SET_ROOM_INFO',
  GAME_OVER = 'GAME_OVER',
}

export type LoadRoomInfoAction = {
  type: ActionType.INITIAL_ROOM_INFO,
  roomInfo: TRoom;
};

export type UpdateRoomInfoAction = {
  type: ActionType.UPDATE_ROOM_INFO,
  roomInfo: Partial<TRoom>;
};

export type SetGameOverAction = {
  type: ActionType.GAME_OVER,
  gameOver: TGameOver;
};

export type Action = LoadRoomInfoAction | UpdateRoomInfoAction | SetGameOverAction;

const reducer = (state: State = defaultState, action: Action): State => {
  switch (action.type) {
    case ActionType.INITIAL_ROOM_INFO: {
      return {
        ...state,
        roomInfo: action.roomInfo,
      }
    }
    case ActionType.UPDATE_ROOM_INFO: {
      if (state.roomInfo) {
        return {
          ...state,
          roomInfo: {
            ...state.roomInfo,
            ...action.roomInfo,
          },
        };
      } else {
        throw Error('Room not found');
      }
    }
    case ActionType.GAME_OVER: {
      return {
        ...state,
        gameOver: action.gameOver,
      };
    }
    default: {
      return state;
    }
  }
}

export default reducer;

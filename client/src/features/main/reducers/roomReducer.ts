import { TRoom } from "../domain/models/Room";

export type State = {
  roomInfo?: TRoom;
  showGameScreen: boolean;
};

export const defaultState: State = {
  showGameScreen: false,
};

export enum ActionType {
  INITIAL_ROOM_INFO = 'INITIAL_ROOM_INFO',
  UPDATE_ROOM_INFO = 'SET_ROOM_INFO',
  GAME_OVER = 'GAME_OVER',
  SET_SHOW_GAME_SCREEN = 'SET_SHOW_GAME_SCREEN',
}

export type LoadRoomInfoAction = {
  type: ActionType.INITIAL_ROOM_INFO,
  roomInfo: TRoom;
};

export type UpdateRoomInfoAction = {
  type: ActionType.UPDATE_ROOM_INFO,
  roomInfo: Partial<TRoom>;
};

export type SetShowGameScreenInfoAction = {
  type: ActionType.SET_SHOW_GAME_SCREEN,
  show: boolean;
};

export type Action = LoadRoomInfoAction | UpdateRoomInfoAction | SetShowGameScreenInfoAction;

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
    case ActionType.SET_SHOW_GAME_SCREEN: {
      return {
        ...state,
        showGameScreen: action.show,
      }
    }
    default: {
      return state;
    }
  }
}

export default reducer;

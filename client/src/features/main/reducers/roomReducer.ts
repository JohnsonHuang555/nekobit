import { TRoom } from "../domain/models/Room";

export type State = {
  roomInfo?: TRoom;
};

export const defaultState: State = {};

export enum ActionType {
  INITIAL_ROOM_INFO = 'INITIAL_ROOM_INFO',
  UPDATE_ROOM_INFO = 'SET_ROOM_INFO',
}

export type LoadRoomInfoAction = {
  type: ActionType.INITIAL_ROOM_INFO,
  roomInfo: TRoom;
};

export type UpdateRoomInfoAction = {
  type: ActionType.UPDATE_ROOM_INFO,
  roomInfo: Partial<TRoom>;
};

export type Action = LoadRoomInfoAction | UpdateRoomInfoAction;

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
    default: {
      return state;
    }
  }
}

export default reducer;

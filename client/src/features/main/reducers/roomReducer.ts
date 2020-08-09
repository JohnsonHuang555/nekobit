import { TRoom } from "src/features/main/domain/models/Room";
import { AppSocketEvent, TSocket } from "src/types/Socket";

export type State = {
  websocket?: WebSocket;
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

  // Socket
  CREATE_SOCKET_ROOM = 'CREATE_SOCKET_ROOM',
  CLOSE_SOCKET_ROOM = 'CLOSE_SOCKET_ROOM',
  SEND_MESSAGE_ROOM = 'SEND_MESSAGE_ROOM',
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

export type CreateSocketAction = {
  type: ActionType.CREATE_SOCKET_ROOM,
  domain: string;
};

export type CloseSocketAction = {
  type: ActionType.CLOSE_SOCKET_ROOM,
};

export type SendMessageAction = {
  type: ActionType.SEND_MESSAGE_ROOM,
  userId?: string;
  event: AppSocketEvent;
  data: any;
};

export type Action = LoadRoomInfoAction
                   | UpdateRoomInfoAction
                   | SetShowGameScreenInfoAction
                   | CreateSocketAction
                   | CloseSocketAction
                   | SendMessageAction;

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

    case ActionType.CREATE_SOCKET_ROOM: {
      const websocket = new WebSocket(`ws://localhost:8080/ws/${action.domain}`);
      return {
        ...state,
        websocket,
      }
    }
    case ActionType.SEND_MESSAGE_ROOM: {
      if (state.websocket) {
        const data: TSocket = {
          userID: action.userId,
          event: action.event,
          data: action.data,
        };
        state.websocket.send(JSON.stringify(data));
        return state;
      }
      throw Error('Socket not found');
    }
    case ActionType.CLOSE_SOCKET_ROOM: {
      if (state.websocket) {
        state.websocket.close();
        return {
          ...state,
          websocket: undefined,
        };
      }
      throw Error('Socket not found');
    }
    default: {
      return state;
    }
  }
}

export default reducer;

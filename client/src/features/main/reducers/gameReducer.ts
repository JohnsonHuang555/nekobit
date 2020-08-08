import { TGame, TCreateRoom } from 'src/features/main/domain/models/Game';
import { TRoom } from '../domain/models/Room';
import { AppSocketEvent, TSocket } from 'src/types/Socket';

export type State = {
  websocket?: WebSocket;
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
  CREATING_ROOM = 'CREATING_ROOM',
  CREATE_ROOM = 'CREATE_ROOM',
  CREATE_ROOM_SUCCESS = 'CREATE_ROOM_SUCCESS',

  // Socket
  CREATE_SOCKET = 'CREATE_SOCKET',
  CLOSE_SOCKET = 'CLOSE_SOCKET',
  SEND_MESSAGE = 'SEND_MESSAGE',
}

export type InitialStateAction = {
  type: ActionType.INITIAL_STATE,
};

export type LoadGameInfoAction = {
  type: ActionType.GET_GAME_INFO_SUCCESS,
  gameInfo: TGame;
};

export type LoadRoomsAction = {
  type: ActionType.GET_ROOMS,
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

export type CreateSocketAction = {
  type: ActionType.CREATE_SOCKET,
  domain: string;
};

export type CloseSocketGameAction = {
  type: ActionType.CLOSE_SOCKET,
};

export type SendMessageGameAction = {
  type: ActionType.SEND_MESSAGE,
  userId: string;
  event: AppSocketEvent;
  data: any;
};

export type Action = InitialStateAction
                   | LoadGameInfoAction
                   | LoadRoomsAction
                   | CreatingRoomsAction
                   | CreatedRoomAction
                   | CreateSocketAction
                   | CloseSocketGameAction
                   | SendMessageGameAction;

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
    case ActionType.GET_ROOMS: {
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
    case ActionType.CREATE_SOCKET: {
      if (action.domain === 'gamePage') {
        const websocket = new WebSocket('ws://localhost:8080/ws/game_page');
        return {
          ...state,
          websocket,
        }
      }
      throw Error('Domain not found');
    }
    case ActionType.SEND_MESSAGE: {
      if (state.websocket && action.userId) {
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
    case ActionType.CLOSE_SOCKET: {
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
};

export default reducer;

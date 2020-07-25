import { TUser } from './../features/main/domain/models/User';
import { TSocket, SocketEvent } from 'src/types/Socket';
import { Ttoast, TAlert } from 'src/types/ReduxTypes';

export type State = {
  gamePageWebSocket?: WebSocket;
  roomPageWebSocket?: WebSocket;
  userInfo?: TUser;
  socketMsg?: TSocket;
  showToast: Ttoast;
  showConfirmModal: TAlert;
}

export const defaultState: State = {
  showToast: {
    show: false,
    message: '',
  },
  showConfirmModal: {
    show: false,
    message: '',
  }
};

export enum ActionType {
  CREATE_SOCKET = 'CREATE_SOCKET',
  CLOSE_SOCKET_GAME = 'CLOSE_SOCKET_GAME',
  CLOSE_SOCKET_ROOM = 'CLOSE_SOCKET_ROOM',

  SEND_MESSAGE_GAME = 'SEND_MESSAGE_GAME',
  SEND_MESSAGE_ROOM = 'SEND_MESSAGE_ROOM',

  GET_USER_INFO = 'GET_USER_INFO',
  SET_USER_INFO = 'SET_USER_INFO',

  SET_SHOW_TOAST = 'SET_SHOW_TOAST',
  SET_CONFIRM_MODAL = 'SET_CONFIRM_MODAL',
};

export type CreateSocketAction = {
  type: ActionType.CREATE_SOCKET,
  domain: string;
};

export type CloseSocketGameAction = {
  type: ActionType.CLOSE_SOCKET_GAME,
};

export type CloseSocketRoomAction = {
  type: ActionType.CLOSE_SOCKET_ROOM,
};

export type SendMessageGameAction = {
  type: ActionType.SEND_MESSAGE_GAME,
  userId: string;
  event: SocketEvent;
  data: any;
};

export type SendMessageRoomAction = {
  type: ActionType.SEND_MESSAGE_ROOM,
  userId: string;
  event: SocketEvent;
  data: any;
};

export type LoadUserInfoAction = {
  type: ActionType.GET_USER_INFO,
};

export type SetUserInfoAction = {
  type: ActionType.SET_USER_INFO,
  userInfo?: TUser;
  isLogout?: boolean;
};

export type SetShowToastAction = {
  type: ActionType.SET_SHOW_TOAST,
  show: boolean;
  message: string;
};

export type SetShowConfirmAction = {
  type: ActionType.SET_CONFIRM_MODAL,
  show: boolean;
  message: string;
};

export type Action = CreateSocketAction
                   | CloseSocketGameAction
                   | CloseSocketRoomAction
                   | SendMessageGameAction
                   | SendMessageRoomAction
                   | LoadUserInfoAction
                   | SetUserInfoAction
                   | SetShowToastAction
                   | SetShowConfirmAction;

const reducer = (state: State = defaultState, action: Action): State => {
  switch (action.type) {
    case ActionType.CREATE_SOCKET: {
      if (action.domain === 'gamePage') {
        // game
        const gamePageWebSocket = new WebSocket('ws://localhost:8080/ws/game_page');
        return {
          ...state,
          gamePageWebSocket,
        }
      } else {
        // room
        const roomPageWebSocket = new WebSocket(`ws://localhost:8080/ws/${action.domain}`);
        return {
          ...state,
          roomPageWebSocket,
        }
      }
    }
    case ActionType.GET_USER_INFO: {
      const userInfo = localStorage.getItem('userInfo');
      if (userInfo) {
        return {
          ...state,
          userInfo: JSON.parse(userInfo),
        }
      }
      return state;
    }
    case ActionType.SET_USER_INFO: {
      if (action.isLogout) {
        localStorage.removeItem('userInfo');
        return {
          ...state,
          userInfo: undefined,
        }
      } else {
        localStorage.setItem('userInfo', JSON.stringify(action.userInfo));
        return {
          ...state,
          userInfo: action.userInfo,
        }
      }
    }
    case ActionType.CLOSE_SOCKET_GAME: {
      if (state.gamePageWebSocket) {
        state.gamePageWebSocket.close();
        return {
          ...state,
          gamePageWebSocket: undefined,
        }
      } else {
        throw Error('Socket not found...');
      }
    }
    case ActionType.CLOSE_SOCKET_ROOM: {
      if (state.roomPageWebSocket) {
        state.roomPageWebSocket.close();
        return {
          ...state,
          roomPageWebSocket: undefined,
        }
      } else {
        throw Error('Socket not found...');
      }
    }
    case ActionType.SEND_MESSAGE_GAME: {
      if (state.gamePageWebSocket && state.userInfo) {
        const data: TSocket = {
          userID: action.userId ?
            action.userId :
            state.userInfo.id,
          event: action.event,
          data: action.data,
        }
        state.gamePageWebSocket.send(JSON.stringify(data));
      }
      return state;
    }
    case ActionType.SEND_MESSAGE_ROOM: {
      if (state.roomPageWebSocket && state.userInfo) {
        const data: TSocket = {
          userID: action.userId ?
            action.userId :
            state.userInfo.id,
          event: action.event,
          data: action.data,
        }
        state.roomPageWebSocket.send(JSON.stringify(data));
      }
      return state;
    }
    case ActionType.SET_SHOW_TOAST: {
      return {
        ...state,
        showToast: {
          show: action.show,
          message: action.message,
        },
      }
    }
    case ActionType.SET_CONFIRM_MODAL: {
      return {
        ...state,
        showConfirmModal: {
          show: action.show,
          message: action.message,
        },
      }
    }
    default: {
      return state;
    }
  }
}

export default reducer;

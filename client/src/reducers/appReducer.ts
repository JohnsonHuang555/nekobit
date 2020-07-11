import { TUser } from './../features/main/domain/models/User';
import { TSocket } from 'src/types/Socket';
import { Ttoast } from 'src/types/ReduxTypes';

export type State = {
  websocket?: WebSocket;
  userInfo?: TUser;
  socketMsg?: TSocket;
  showToast: Ttoast;
}

export const defaultState: State = {
  showToast: {
    show: false,
    message: '',
  },
};

export enum ActionType {
  CREATE_SOCKET = 'CREATE_SOCKET',
  CLOSE_SOCKET = 'CLOSE_SOCKET',
  GET_USER_INFO = 'GET_USER_INFO',
  SET_SHOW_TOAST = 'SET_SHOW_TOAST',
};

export type CreateSocketAction = {
  type: ActionType.CREATE_SOCKET,
  domain: string;
};

export type CloseSocketAction = {
  type: ActionType.CLOSE_SOCKET,
};

export type LoadUserInfoAction = {
  type: ActionType.GET_USER_INFO,
};

export type SetShowToastAction = {
  type: ActionType.SET_SHOW_TOAST,
  show: boolean,
  message: string,
};

export type Action = CreateSocketAction | CloseSocketAction | LoadUserInfoAction | SetShowToastAction;

const reducer = (state: State = defaultState, action: Action): State => {
  switch (action.type) {
    case ActionType.CREATE_SOCKET: {
      const websocket = new WebSocket(`ws://localhost:8080/ws/${action.domain}`);
      return {
        ...state,
        websocket,
      }
    }
    case ActionType.GET_USER_INFO: {
      const userInfo = JSON.parse(localStorage.getItem('userInfo') || '');
      return {
        ...state,
        userInfo,
      }
    }
    case ActionType.CLOSE_SOCKET: {
      if (state.websocket) {
        state.websocket.close();
        return {
          ...state,
          websocket: undefined,
        }
      } else {
        throw Error('Socket not found...');
      }
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
    default: {
      return state;
    }
  }
}

export default reducer;

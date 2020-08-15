import { TUser } from './../features/main/domain/models/User';
import { Ttoast, TModal } from 'src/types/ReduxTypes';

export type State = {
  roomPageWebSocket?: WebSocket;
  userInfo?: TUser;
  showToast: Ttoast;
  showConfirmModal: TModal;
  showAlertModal: TModal;
}

export const defaultState: State = {
  showToast: {
    show: false,
    message: '',
  },
  showConfirmModal: {
    show: false,
    message: '',
  },
  showAlertModal: {
    show: false,
    message: '',
  },
};

export enum ActionType {
  GET_USER_INFO = 'GET_USER_INFO',
  SET_USER_INFO = 'SET_USER_INFO',

  SET_SHOW_TOAST = 'SET_SHOW_TOAST',
  SET_CONFIRM_MODAL = 'SET_CONFIRM_MODAL',
  SET_ALERT_MODAL = 'SET_ALERT_MODAL',
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

export type SetShowAlertAction = {
  type: ActionType.SET_ALERT_MODAL,
  show: boolean;
  message: string;
};

export type Action = LoadUserInfoAction
                   | SetUserInfoAction
                   | SetShowToastAction
                   | SetShowConfirmAction
                   | SetShowAlertAction;

const reducer = (state: State = defaultState, action: Action): State => {
  switch (action.type) {
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
    case ActionType.SET_ALERT_MODAL: {
      return {
        ...state,
        showAlertModal: {
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

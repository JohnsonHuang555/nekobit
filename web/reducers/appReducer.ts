import { ActionType } from 'actions/AppAction';
import { User } from 'domain/models/User';

export type State = {
  userInfo?: User;
  snackbar: {
    show: boolean;
    message: string;
  };
};

const initialState: State = {
  snackbar: {
    show: false,
    message: '',
  },
};

type LoadedUserInfoAction = {
  type: ActionType.LOADED_USER_INFO;
  userInfo: User;
};

type SetSnackbarAction = {
  type: ActionType.SET_SNACKBAR;
  show: boolean;
  message: string;
};

type Action = LoadedUserInfoAction | SetSnackbarAction;

const reducer = (state = initialState, action: Action): State => {
  switch (action.type) {
    case ActionType.LOADED_USER_INFO: {
      return {
        ...state,
        userInfo: action.userInfo,
      };
    }
    case ActionType.SET_SNACKBAR: {
      return {
        ...state,
        snackbar: {
          show: action.show,
          message: action.message,
        },
      };
    }
    default: {
      return state;
    }
  }
};

export default reducer;

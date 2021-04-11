import { ActionType } from 'actions/AppAction';
import { User } from 'domain/models/User';

export type State = {
  userInfo?: User;
};

const initialState: State = {};

type LoadedUserInfoAction = {
  type: ActionType.LOADED_USER_INFO;
  userInfo: User;
};

type Action = LoadedUserInfoAction;

const reducer = (state = initialState, action: Action) => {
  switch (action.type) {
    case ActionType.LOADED_USER_INFO: {
      return {
        ...state,
        ...{ userInfo: action.userInfo },
      };
    }
    default: {
      return state;
    }
  }
};

export default reducer;

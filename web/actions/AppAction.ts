import { User } from 'domain/models/User';

export enum ActionType {
  FAILURE = 'FAILURE',
  LOADED_USER_INFO = 'LOADED_USER_INFO',
  SET_SNACKBAR = 'SET_SNACKBAR',
}

export const failure = (error: Error) => {
  return {
    type: ActionType.FAILURE,
    error,
  };
};

export const loadUserInfo = (userInfo: User) => {
  return {
    type: ActionType.LOADED_USER_INFO,
    userInfo,
  };
};

type snackbar = {
  show: boolean;
  message: string;
};

export const setSnackbar = ({ show, message }: snackbar) => {
  return {
    type: ActionType.SET_SNACKBAR,
    show,
    message,
  };
};

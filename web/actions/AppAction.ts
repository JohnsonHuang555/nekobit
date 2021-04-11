import { User } from 'domain/models/User';

export enum ActionType {
  LOADED_USER_INFO = 'LOADED_USER_INFO',
}

export const loadUserInfo = (userInfo: User) => {
  return {
    type: ActionType.LOADED_USER_INFO,
    userInfo,
  };
};

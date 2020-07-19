import { StoreState } from 'src/reducers';

export const userInfoSelector = (store: StoreState) =>
  store.app.userInfo;

export const websocketSelector = (store: StoreState) =>
  store.app.websocket;

export const showToastSelector = (store: StoreState) =>
  store.app.showToast;

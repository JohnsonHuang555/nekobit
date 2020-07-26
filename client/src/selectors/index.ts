import { StoreState } from 'src/reducers';

export const userInfoSelector = (store: StoreState) =>
  store.app.userInfo;

export const gameWebsocketSelector = (store: StoreState) =>
  store.app.gamePageWebSocket;

export const roomWebsocketSelector = (store: StoreState) =>
  store.app.roomPageWebSocket;

export const showToastSelector = (store: StoreState) =>
  store.app.showToast;

export const showConfirmModalSelector = (store: StoreState) =>
  store.app.showConfirmModal;

export const showAlertModalSelector = (store: StoreState) =>
  store.app.showAlertModal;

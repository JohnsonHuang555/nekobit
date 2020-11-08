import { StoreState } from 'src/reducers';

export const userInfoSelector = (store: StoreState) =>
  store.app.userInfo;

export const showToastSelector = (store: StoreState) =>
  store.app.showToast;

export const showConfirmModalSelector = (store: StoreState) =>
  store.app.showConfirmModal;

export const showAlertModalSelector = (store: StoreState) =>
  store.app.showAlertModal;

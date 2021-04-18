import { StoreState } from 'reducers/rootReducer';

export const userInfoSelector = (store: StoreState) => store.app.userInfo;
export const snackbarSelector = (store: StoreState) => store.app.snackbar;

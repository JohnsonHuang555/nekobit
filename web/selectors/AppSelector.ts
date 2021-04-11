import { StoreState } from 'reducers/rootReducer';

export const userInfoSelector = (store: StoreState) => store.app.userInfo;

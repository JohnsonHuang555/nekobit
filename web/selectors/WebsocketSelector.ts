import { StoreState } from 'reducers/rootReducer';

export const isConnectedSelector = (store: StoreState) =>
  store.websocket.isConnected;

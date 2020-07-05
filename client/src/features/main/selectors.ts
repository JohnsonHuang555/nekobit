import { StoreState } from 'src/reducers';

// index
export const gamesSelector = (store: StoreState) =>
  store.main.index.games;

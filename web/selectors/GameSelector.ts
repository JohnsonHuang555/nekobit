import { StoreState } from 'reducers/rootReducer';

// home
export const gamesSelector = (store: StoreState) => store.game.games;

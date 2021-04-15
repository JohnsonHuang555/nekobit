import { StoreState } from 'reducers/rootReducer';

// home
export const gamesSelector = (store: StoreState) => store.game.games;

// game
export const gameSelector = (store: StoreState) => store.game.gameInfo;

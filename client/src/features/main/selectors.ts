import { StoreState } from 'src/reducers';

// index
export const gamesSelector = (store: StoreState) =>
  store.main.index.games;

// game
export const gameInfoSelector = (store: StoreState) =>
  store.main.game.gameInfo;

export const roomsSelector = (store: StoreState) =>
  store.main.game.rooms;

export const createRoomDataSelector = (store: StoreState) =>
  store.main.game.createRoomData;

export const createdRoomIdSelector = (store: StoreState) =>
  store.main.game.createdRoomId;

import { StoreState } from 'reducers/rootReducer';

// game
export const roomsSelector = (store: StoreState) => store.room.rooms;
export const createdIdSelector = (store: StoreState) => store.room.createdId;

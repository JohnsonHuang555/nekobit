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

// room
const getUserInfo = (store: StoreState) => {
  return store.main.room.roomInfo?.userList.find(
    user => user.id === store.app.userInfo?.id
  );
};

export const roomInfoSelector = (store: StoreState) =>
  store.main.room.roomInfo;

export const isYouMasterSelector = (store: StoreState) => {
  const user = getUserInfo(store);
  if (user && user.isMaster) {
    return true;
  }
  return false;
}

export const isPlayerReadySelector = (store: StoreState) => {
  const user = getUserInfo(store);
    if (user && user.isReady) {
      return 'Cancel';
    }
    return 'Ready';
}

export const playerSideSelector = (store: StoreState) => {
  const user = getUserInfo(store);
  if (user) {
    return user.side
  }
  return '';
}

export const showGameScreenSelector = (store: StoreState) =>
  store.main.room.showGameScreen;

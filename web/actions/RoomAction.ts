import {
  Room,
  GamePack,
  CreateRoomParams,
  CheckJoinRoomParams,
} from 'domain/models/Room';

export enum ActionType {
  HYDRATE = 'HYDRATE',
  LOAD_ROOMS = 'LOAD_ROOMS',
  LOAD_ROOMS_SUCCESS = 'LOAD_ROOMS_SUCCESS',
  CREATE_ROOM = 'CREATE_ROOM',
  CREATE_ROOM_SUCCESS = 'CREATE_ROOM_SUCCESS',
  CHECK_JOIN_ROOM = 'CHECK_JOIN_ROOM',
  CHECK_JOIN_ROOM_SUCCESS = 'CHECK_JOIN_ROOM_SUCCESS',
}

// loadRooms
export const loadRooms = (gamePack: string) => {
  return {
    type: ActionType.LOAD_ROOMS,
    gamePack,
  };
};

export const loadRoomsSuccess = (rooms: Room[]) => {
  return {
    type: ActionType.LOAD_ROOMS_SUCCESS,
    rooms,
  };
};

// createRoom
export type CreateRoomPayload = CreateRoomParams & {
  gamePack: GamePack;
};
export const createRoom = ({ name, mode, gamePack }: CreateRoomPayload) => {
  return {
    type: ActionType.CREATE_ROOM,
    payload: {
      name,
      mode,
      gamePack,
    },
  };
};

export const createRoomSuccess = (roomId: string) => {
  return {
    type: ActionType.CREATE_ROOM_SUCCESS,
    roomId,
  };
};

// checkJoinRoom
export const checkJoinRoom = (roomId: string) => {
  return {
    type: ActionType.CHECK_JOIN_ROOM,
    roomId,
  };
};

export const checkJoinRoomSuccess = (canJoin: boolean, message: string) => {
  return {
    type: ActionType.CHECK_JOIN_ROOM_SUCCESS,
    canJoin,
    message,
  };
};

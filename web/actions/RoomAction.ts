import { CreateRoomParams } from 'components/modals/CreateRoom';
import { GamePack, Room } from 'domain/models/Room';

export enum ActionType {
  HYDRATE = 'HYDRATE',
  LOAD_ROOMS = 'LOAD_ROOMS',
  LOAD_ROOMS_SUCCESS = 'LOAD_ROOMS_SUCCESS',
  CREATE_ROOM = 'CREATE_ROOM',
  CREATE_ROOM_SUCCESS = 'CREATE_ROOM_SUCCESS',
}

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

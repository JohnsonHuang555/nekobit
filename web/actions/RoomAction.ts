import { Room } from 'domain/models/Room';

export enum ActionType {
  HYDRATE = 'HYDRATE',
  LOAD_ROOMS = 'LOAD_ROOMS',
  LOAD_ROOMS_SUCCESS = 'LOAD_ROOMS_SUCCESS',
  JoinRoom = 'join_room',
  LeaveRoom = 'leave_room',
  ReadyGame = 'ready_game',
  ReadyToStart = 'ready_to_start',
  StartGame = 'start_game',
  Surrender = 'surrender',
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

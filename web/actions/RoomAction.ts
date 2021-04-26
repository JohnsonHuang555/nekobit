import { Game } from 'domain/models/Game';
import { Player } from 'domain/models/Player';
import { Room, GamePack, CreateRoomParams } from 'domain/models/Room';
import { SocketEvent } from 'domain/models/WebSocket';

export enum ActionType {
  HYDRATE = 'HYDRATE',
  LOAD_ROOMS = 'LOAD_ROOMS',
  LOAD_ROOMS_SUCCESS = 'LOAD_ROOMS_SUCCESS',
  CREATE_ROOM = 'CREATE_ROOM',
  CREATE_ROOM_SUCCESS = 'CREATE_ROOM_SUCCESS',
  CHECK_JOIN_ROOM = 'CHECK_JOIN_ROOM',
  CHECK_JOIN_ROOM_SUCCESS = 'CHECK_JOIN_ROOM_SUCCESS',
  RESET = 'RESET',
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

export const joinRoom = (roomInfo: Room, gameInfo: Game) => {
  return {
    type: SocketEvent.JoinRoom,
    roomInfo,
    gameInfo,
  };
};

export const leaveRoom = (players: Player[]) => {
  return {
    type: SocketEvent.LeaveRoom,
    players,
  };
};

export const readyGame = (players: Player[]) => {
  return {
    type: SocketEvent.ReadyGame,
    players,
  };
};

export const reset = () => {
  return {
    type: ActionType.RESET,
  };
};

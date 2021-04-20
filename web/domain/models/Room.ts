import { Player } from 'domain/models/Player';

export type Room = {
  id: string;
  title: string;
  password: string;
  status: GameStatus;
  playerList: Player[];
  nowTurn: string;
  gameData: any;
  gamePack: GamePack;
  gameMode: string; // FIXME: 擴充列舉
  createdAt: string;
};

export enum GamePack {
  ChineseChess = 'chinese_chess',
  Chess = 'chess',
}

export enum GameStatus {
  Preparing = 'preparing',
  Playing = 'playing',
}

// action params
export type CreateRoomParams = {
  name: string;
  mode: string;
};

export type CheckJoinRoomParams = {
  roomId: string;
  gamePack: GamePack;
};

export type CheckJionRoomResponse = {
  canJoin: boolean;
  message: string;
};

export type TRoom = {
  _id: string;
  UserList: TRoomUser[];
  Title: string;
  Mode: number;
  IsLock: boolean;
  CurrentPlayer: number;
  MaxPlayers: number;
  CreateDate: string;
  NowTurn: number;
  GameStatus: number;
  GameName: string;
}

export type TRoomUser = {
  Id: string;
  Name: string;
  IsMaster: boolean;
  IsReady: boolean;
  PlayOrder: number;
}
export type RoomProps = {
  _id: string;
  UserList: [];
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
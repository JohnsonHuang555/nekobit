export type TRoom = {
  _id: string;
  userList: TRoomUser[];
  title: string;
  mode: number;
  isLock: boolean;
  currentPlayer: number;
  maxPlayers: number;
  createDate: string;
  nowTurn: number;
  gameStatus: number;
  gameName: string;
}

export type TRoomUser = {
  id: string;
  name: string;
  isMaster: boolean;
  isReady: boolean;
  playOrder: number;
}
export type TRoom = {
  _id: string;
  title: string;
  mode: number;
  gameID: string;
  status: number;
  maxPlayers: number;
  userList: TRoomUser[];
  name: string;
}

export type TRoomUser = {
  id: string;
  name: string;
  isMaster: boolean;
  isReady: boolean;
  playOrder: number;
}
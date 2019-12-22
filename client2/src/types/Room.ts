export type TRoom = {
  id: string;
  title: string;
  mode: number;
  status: number;
  userList: TRoomUser[];
  nowTurn: string;
  gameData: any;
  gameName: string;
}

export type TRoomUser = {
  id: string;
  name: string;
  isMaster: boolean;
  isReady: boolean;
  playOrder: number;
}
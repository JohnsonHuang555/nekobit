import { Moment } from 'moment';

export type TRoom = {
  id: string;
  title: string;
  mode: number;
  status: number;
  userList: TRoomUser[];
  nowTurn: string;
  gameData: any;
  gameID: string;
  roomNumber: number;
  password: string;
  createAt: Moment;
}

export type TRoomUser = {
  id: string;
  name: string;
  isMaster: boolean;
  isReady: boolean;
  playOrder: number;
  side: string;
};

export type TSocket = {
  userID?: string;
  event: SocketEvent;
  data?: any;
}

export enum SocketEvent {
  GetRooms = 'getRooms',
  JoinRoom = 'joinRoom',
  LeaveRoom = 'leaveRoom',
}

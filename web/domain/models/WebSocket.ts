import { ActionType as RoomActionType } from 'actions/RoomAction';

export type WebSocketParams = {
  event: RoomActionType;
  player_id: string;
  data?: any;
};

export enum SocketEvent {
  JoinRoom = 'join_room',
  LeaveRoom = 'leave_room',
  ReadyGame = 'ready_game',
  ReadyToStart = 'ready_to_start',
  StartGame = 'start_game',
  Surrender = 'surrender',
}

export type WebSocketParams = {
  event: SocketEvent | ChineseChessSocketEvent,
  player_id: string;
  data?: any;
};

export enum SocketEvent {
  JoinRoom = 'join_room',
  LeaveRoom = 'leave_room',
  ReadyGame = 'ready_game',
  ReadyToStart = 'ready_to_start',
  StartGame = 'start_game',
}

export enum ChineseChessSocketEvent {
  MoveChess = 'move_chess',
  EatChess = 'eat_chess',
  FlipChess = 'flip_chess',
}

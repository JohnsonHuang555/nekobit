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
  Surrender = 'surrender',
}

export enum ChineseChessSocketEvent {
  MoveChess = 'chinese_chess/move_chess',
  EatChess = 'chinese_chess/eat_chess',
  FlipChess = 'chinese_chess/flip_chess',
}

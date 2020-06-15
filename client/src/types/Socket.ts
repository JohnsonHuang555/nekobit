export type TSocket = {
  userID?: string;
  event: SocketEvent;
  data?: any;
}

export enum SocketEvent {
  GetRooms = 'getRooms',
  JoinRoom = 'joinRoom',
  LeaveRoom = 'leaveRoom',
  CreateRoom = 'createRoom',
  ReadyGame = 'readyGame',
  StartGame = 'startGame',
  SetPlayOrder = 'setPlayOrder',
  GameOver = 'gameOver',

  // Chinese Chess
  MoveChess = 'moveChess',
  EatChess = 'eatChess',
  FlipChess = 'flipChess',
}

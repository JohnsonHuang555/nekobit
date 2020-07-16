export type TSocket = {
  userID?: string;
  event: SocketEvent;
  data?: any;
}

export type TGameOver = {
  isGameOver: boolean;
  winner: string;
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
  ChangePassword = 'changePassword',

  // Chinese Chess
  MoveChess = 'moveChess',
  EatChess = 'eatChess',
  FlipChess = 'flipChess',
}

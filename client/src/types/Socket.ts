export type TSocket = {
  userID?: string;
  event: AppSocketEvent | ChineseChessSocketEvent;
  data?: any;
}

export enum AppSocketEvent {
  JoinRoom = 'joinRoom',
  LeaveRoom = 'leaveRoom',
  CreateRoom = 'createRoom',
  ReadyGame = 'readyGame',
  StartGame = 'startGame',
  SetPlayOrder = 'setPlayOrder',
  GameOver = 'gameOver',
  ChangePassword = 'changePassword',
}

export enum ChineseChessSocketEvent {
  MoveChess = 'moveChess',
  EatChess = 'eatChess',
  FlipChess = 'flipChess',
  SetSideBlack = 'setPlayerSideStandard',
}

import { IFetcher } from "src/api/Fetcher";
import { ChineseChess } from "src/features/games/chinese_chess/source/ChineseChessDataSource";
import { SocketEvent } from "src/types/Socket";
import { TUser } from "src/types/Account";

export default class ChineseChessRepository implements ChineseChess.DataSource {
  private fetcher: IFetcher;
  private userInfo: TUser | null = null;

  constructor(fetcher: IFetcher) {
    this.fetcher = fetcher;
    if (typeof window !== 'undefined' && localStorage.getItem('userInfo')) {
      this.userInfo = JSON.parse(localStorage.getItem('userInfo') || '');
    }
  }

  flipChess(roomID: string, chessID: number): void {
    this.fetcher.sendSocket({
      userID: this.userInfo?.id,
      event: SocketEvent.FlipChess,
      data: {
        roomID,
        chessID,
      }
    });
  }
  eatChess(roomID: string, chessID: number, targetID: number): void {
    this.fetcher.sendSocket({
      userID: this.userInfo?.id,
      event: SocketEvent.MoveChess,
      data: {
        roomID,
        chessID,
        targetID,
      }
    });
  }
  moveChess(roomID: string, chessID: number, locationX: number, locationY: number): void {
    this.fetcher.sendSocket({
      userID: this.userInfo?.id,
      event: SocketEvent.MoveChess,
      data: {
        roomID,
        chessID,
        locationX,
        locationY,
      }
    });
  }
  getSocketMessage(callbacks: ChineseChess.GetSocketMessageCallbacks): void {
    this.fetcher.getSocketMessage({
      onSuccess: (result) => {
        callbacks.onSuccess(result);
      },
      onError: e => callbacks.onError(e)
    });
  }
}

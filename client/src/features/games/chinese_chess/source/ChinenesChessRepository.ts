import { IFetcher } from "src/api/Fetcher";
import { ChineseChess } from "./ChineseChessDataSource";
import { SocketEvent } from "src/types/Socket";

export default class ChineseChessRepository implements ChineseChess.DataSource {
  private fetcher: IFetcher;

  constructor(fetcher: IFetcher) {
    this.fetcher = fetcher;
  }

  flipChess(id: number): void {
    throw new Error("Method not implemented.");
  }
  eatChess(id: number, targetID: number): void {
    throw new Error("Method not implemented.");
  }
  moveChess(id: number, locationX: number, locationY: number): void {
    this.fetcher.sendSocket({
      event: SocketEvent.MoveChess
    })
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

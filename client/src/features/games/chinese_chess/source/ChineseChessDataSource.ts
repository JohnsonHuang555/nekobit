import {
  SuccessCallback,
  ErrorCallback,
} from "src/domain/source/base/RepositoryCallbacks";
import { TSocket } from "src/types/Socket";

export namespace ChineseChess {
  export interface DataSource {
    flipChess(roomID: string, chessID: number): void;
    eatChess(roomID: string, chessID: number, targetID: number): void;
    moveChess(roomID: string, chessID: number, locationX: number, locationY: number): void;

    getSocketMessage(callbacks: ChineseChess.GetSocketMessageCallbacks): void;
  }

  export interface GetSocketMessageCallbacks extends SuccessCallback<TSocket>, ErrorCallback {}
}

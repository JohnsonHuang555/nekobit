import {
  SuccessCallback,
  ErrorCallback,
} from "src/domain/source/base/RepositoryCallbacks";
import { TSocket } from "src/types/Socket";

export namespace ChineseChess {
  export interface DataSource {
    flipChess(id: number): void;
    eatChess(id: number, targetID: number): void;
    moveChess(id: number, locationX: number, locationY: number ): void;

    getSocketMessage(callbacks: ChineseChess.GetSocketMessageCallbacks): void;
  }

  export interface GetSocketMessageCallbacks extends SuccessCallback<TSocket>, ErrorCallback {}
}

import {
  UseCaseInputData,
  UseCaseOutputData,
  UseCaseCallbacks,
  UseCase as BaseUseCase
} from "src/domain/usecases/base/UseCase";
import { TChineseChess, ChessSide } from "src/features/games/domain/models/ChineseChess";
import { TRoomUser } from "src/features/main/domain/models/Room";
import { SocketEvent } from "src/types/Socket";

export type TGameOver = {
  isGameOver: boolean;
  winnerSide?: ChessSide;
}

export namespace GetSocketMessage {
  export interface InputData extends UseCaseInputData {}

  export interface OutputData extends UseCaseOutputData {
    chesses?: TChineseChess[];
    userList?: TRoomUser[];
    nowTurn?: string;
    event: SocketEvent;
    gameOverObj?: TGameOver;
  }

  export interface Callbacks extends UseCaseCallbacks<OutputData> {}

  export interface UseCase extends BaseUseCase<InputData, OutputData> {}
}

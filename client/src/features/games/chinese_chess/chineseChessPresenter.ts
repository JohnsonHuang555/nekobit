import { GetSocketMessage } from 'src/features/games/chinese_chess/use_cases/base/GetSocketMessageUseCaseItf';
import { ChineseChessContract } from "./chineseChessContract";
import { UseCaseHandler } from "src/domain/usecases/base/UseCaseHandler";
import { MoveChess } from './use_cases/base/MoveChessUseCaseItf';
import { EatChess } from './use_cases/base/EatChessUseCaseItf';
import { FlipChess } from './use_cases/base/FlipChessUseCaseItf';
import { SocketEvent } from 'src/types/Socket';
import { TChineseChess } from '../domain/models/ChineseChess';

type TRange = {
  x: number;
  y: number;
}

export class ChineseChessPresenter implements ChineseChessContract.Presenter {
  private readonly view: ChineseChessContract.View;
  private readonly useCaseHandler: UseCaseHandler;
  private readonly getSocketMessageUseCase: GetSocketMessage.UseCase;
  private readonly moveChessUseCase: MoveChess.UseCase;
  private readonly eatChessUseCase: EatChess.UseCase;
  private readonly flipChessUseCase: FlipChess.UseCase;

  private roomID = '';
  private chesses: TChineseChess[] = [];

  constructor(
    view: ChineseChessContract.View,
    useCaseHandler: UseCaseHandler,
    getSocketMessageUseCase: GetSocketMessage.UseCase,
    moveChessUseCase: MoveChess.UseCase,
    eatChessUseCase: EatChess.UseCase,
    flipChessUseCase: FlipChess.UseCase,
  ) {
    this.view = view;
    this.useCaseHandler = useCaseHandler;
    this.getSocketMessageUseCase = getSocketMessageUseCase;
    this.moveChessUseCase = moveChessUseCase;
    this.eatChessUseCase = eatChessUseCase;
    this.flipChessUseCase = flipChessUseCase;
  }

  mount(roomID: string, chesses: TChineseChess[]): void {
    this.roomID = roomID;
    this.chesses = chesses;
    this.getMessageHandler();
  }

  getMessageHandler(): void {
    this.useCaseHandler.execute(this.getSocketMessageUseCase, {}, {
      onSuccess: (result) => {
        switch (result.event) {
          case SocketEvent.SetPlayOrder: {
            if (result.userList?.length && result.nowTurn) {
              this.view.setNowTurn(result.nowTurn);
              this.view.setUserList(result.userList);
            }
            break;
          }
          case SocketEvent.FlipChess: {
            if (result.chesses && result.nowTurn && result.userList?.length) {
              this.view.setChesses(result.chesses);
              this.view.setNowTurn(result.nowTurn);
              this.view.setUserList(result.userList);
            }
            break;
          }
          case SocketEvent.EatChess:
          case SocketEvent.MoveChess: {
            if (result.chesses && result.nowTurn) {
              this.view.setSelectedChess(undefined);
              this.view.setChesses(result.chesses);
              this.view.setNowTurn(result.nowTurn);
            }
            break;
          }
        }
      },
      onError: () => {
        // error toast
      }
    });
  }

  updateChesses(chesses: TChineseChess[]): void {
    this.chesses = chesses;
  }

  onSelect(id: number): void {
    const selectedChess = this.chesses.find(chess => {
      return chess.id === id;
    });
    if (selectedChess) {
      this.view.setSelectedChess(selectedChess);
    }
  }

  onFlip(id: number): void {
    this.useCaseHandler.execute(this.flipChessUseCase, {
      roomID: this.roomID,
      chessID: id,
    });
  }

  onEat(id: number, targetID: number): void {
    // TODO:判斷吃
    this.useCaseHandler.execute(this.eatChessUseCase, {
      roomID: this.roomID,
      chessID: id,
      targetChessID: targetID
    })
  }

  onMove(id: number, targetX: number, targetY: number): void {
    const selectedChess = this.findChessById(id);
    if (!selectedChess) { return; }

    const range = this.chessShortCrossRange(selectedChess.locationX, selectedChess.locationY);
    const canMove = this.canChessMoved(range, targetX, targetY);
    if (!canMove) { return; }

    this.useCaseHandler.execute(this.moveChessUseCase, {
      roomID: this.roomID,
      chessID: id,
      targetX,
      targetY,
    });
  }

  // 短十字的步數範圍
  private chessShortCrossRange(currentX: number, currentY: number): TRange[] {
    const range: TRange[] = [];
    range.push({ x: currentX + 1, y: currentY });
    range.push({ x: currentX - 1, y: currentY });
    range.push({ x: currentX, y: currentY + 1 });
    range.push({ x: currentX, y: currentY - 1 });
    return range;
  }

  // 砲的步數範圍
  private chessCannonRange(): TRange[] {
    const range: TRange[] = [];
    return range;
  }

  // 判斷棋子是否可以移動
  private canChessMoved(range: TRange[], targetX: number, targetY: number): boolean {
    const canMove = range.find(r => {
      return r.x === targetX && r.y === targetY;
    });
    return canMove ? true : false;
  }

  // 判斷棋子階級是否可以吃
  private canChessEaten(): boolean {
    return false;
  }

  private findChessById(id: number): TChineseChess | undefined {
    const chess = this.chesses.find(c => {
      return c.id === id;
    });
    return chess;
  }
};

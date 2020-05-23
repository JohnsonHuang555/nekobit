import { GetSocketMessage } from 'src/features/games/chinese_chess/use_cases/base/GetSocketMessageUseCaseItf';
import { ChineseChessContract } from "./chineseChessContract";
import { UseCaseHandler } from "src/domain/usecases/base/UseCaseHandler";
import { MoveChess } from './use_cases/base/MoveChessUseCaseItf';
import { EatChess } from './use_cases/base/EatChessUseCaseItf';
import { FlipChess } from './use_cases/base/FlipChessUseCaseItf';

export class ChineseChessPresenter implements ChineseChessContract.Presenter {
  private readonly view: ChineseChessContract.View;
  private readonly useCaseHandler: UseCaseHandler;
  private readonly getSocketMessageUseCase: GetSocketMessage.UseCase;
  private readonly moveChessUseCase: MoveChess.UseCase;
  private readonly eatChessUseCase: EatChess.UseCase;
  private readonly flipChessUseCase: FlipChess.UseCase;

  private roomID = '';

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

  mount(roomID: string): void {
    this.roomID = roomID;
    this.getMessageHandler();
  }
  getMessageHandler(): void {
    this.useCaseHandler.execute(this.getSocketMessageUseCase, {}, {
      onSuccess: (result) => {
        if (result.chesses) {
          this.view.setChesses(result.chesses);
        }
      },
      onError: () => {
        // error toast
      }
    });
  }

  onFlip(id: number): void {
    // TODO:判斷翻牌
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
    // TODO:判斷移動
    this.useCaseHandler.execute(this.moveChessUseCase, {
      roomID: this.roomID,
      chessID: id,
      targetX,
      targetY,
    })
  }
};

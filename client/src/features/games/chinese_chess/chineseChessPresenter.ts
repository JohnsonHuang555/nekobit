import { GetSocketMessage } from 'src/features/games/chinese_chess/use_cases/base/GetSocketMessageUseCaseItf';
import { ChineseChessContract } from "./chineseChessContract";
import { UseCaseHandler } from "src/domain/usecases/base/UseCaseHandler";
import { MoveOrEatChess, MoveOrEatCode } from './use_cases/base/MoveOrEatChessUseCaseItf';
import { FlipChess } from './use_cases/base/FlipChessUseCaseItf';
import { SocketEvent } from 'src/types/Socket';
import { TChineseChess, GameModeCode, ChessName } from '../domain/models/ChineseChess';

export class ChineseChessPresenter implements ChineseChessContract.Presenter {
  private readonly view: ChineseChessContract.View;
  private readonly useCaseHandler: UseCaseHandler;
  private readonly getSocketMessageUseCase: GetSocketMessage.UseCase;
  private readonly moveOrEatChessUseCase: MoveOrEatChess.UseCase;
  private readonly flipChessUseCase: FlipChess.UseCase;

  private roomID = '';
  private chesses: TChineseChess[] = [];

  constructor(
    view: ChineseChessContract.View,
    useCaseHandler: UseCaseHandler,
    getSocketMessageUseCase: GetSocketMessage.UseCase,
    moveOrEatChessUseCase: MoveOrEatChess.UseCase,
    flipChessUseCase: FlipChess.UseCase,
  ) {
    this.view = view;
    this.useCaseHandler = useCaseHandler;
    this.getSocketMessageUseCase = getSocketMessageUseCase;
    this.moveOrEatChessUseCase = moveOrEatChessUseCase;
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
    this.view.setSelectedChess(undefined);
  }

  onEat(id: number, targetID: number, gameMode: GameModeCode): void {
    const selectedChess = this.findChessById(id);
    const targetChess = this.findChessById(targetID);
    if (!selectedChess || !targetChess) { return; }

    // 炮 要判斷中間是否隔一個
    if (selectedChess.name === ChessName.CannonsBlack || selectedChess.name === ChessName.CannonsRed) {
      if (selectedChess.locationX === targetChess.locationX) {
        const middelChesses = this.chesses.filter(c => {
          return c.locationX === targetChess.locationX &&
                 c.locationY > Math.min(targetChess.locationY, selectedChess.locationY) &&
                 c.locationY < Math.max(targetChess.locationY, selectedChess.locationY) &&
                 c.alive
        });
        if (middelChesses.length !== 1) {
          return;
        }
      }
      if (selectedChess.locationY === targetChess.locationY) {
        const middelChesses = this.chesses.filter(c => {
          return c.locationY === targetChess.locationY &&
                 c.locationX > Math.min(targetChess.locationX, selectedChess.locationX) &&
                 c.locationX < Math.max(targetChess.locationX, selectedChess.locationX) &&
                 c.alive
        });
        if (middelChesses.length !== 1) {
          return;
        }
      }
    }

    this.useCaseHandler.execute(this.moveOrEatChessUseCase,
      {
        gameMode,
        targetChess,
        selectedChess,
        roomID: this.roomID,
        action: MoveOrEatCode.Eat,
      },
      {
        onSuccess: () => {},
        onError: () => {
          // error toast
        }
      }
    );
  }

  onMove(id: number, targetX: number, targetY: number, gameMode: GameModeCode): void {
    const selectedChess = this.findChessById(id);
    if (!selectedChess) { return; }

    this.useCaseHandler.execute(this.moveOrEatChessUseCase,
      {
        gameMode,
        selectedChess,
        targetX,
        targetY,
        roomID: this.roomID,
        action: MoveOrEatCode.Move,
      },
      {
        onSuccess: () => {},
        onError: () => {
          // error toast
        }
      }
    );
  }

  private findChessById(id: number): TChineseChess | undefined {
    const chess = this.chesses.find(c => {
      return c.id === id;
    });
    return chess;
  }
};

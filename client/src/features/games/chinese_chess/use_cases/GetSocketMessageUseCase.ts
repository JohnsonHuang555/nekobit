import { GetSocketMessage, TGameOver } from "src/features/games/chinese_chess/use_cases/base/GetSocketMessageUseCaseItf";
import { ChineseChess } from "src/features/games/chinese_chess/source/ChineseChessDataSource";
import { ChineseChessFactory } from "src/features/games/domain/factories/ChineseChessFactory";
import { SocketEvent } from "src/types/Socket";
import { UserFactory } from "src/features/main/domain/factories/UserFactory";
import { ChessSide } from "../../domain/models/ChineseChess";

export class GetSocketMessageUseCase implements GetSocketMessage.UseCase {
  private repository: ChineseChess.DataSource;
  constructor(repository: ChineseChess.DataSource) {
    this.repository = repository;
  }

  execute(inputData: GetSocketMessage.InputData, callbacks: GetSocketMessage.Callbacks) {
    this.repository.getSocketMessage({
      onSuccess: (result) => {
        switch (result.event) {
          case SocketEvent.SetPlayOrder: {
            const userList = UserFactory.createArrayFromNet(result.data.roomInfo.user_list);
            const nowTurn = result.data.roomInfo.now_turn;
            callbacks.onSuccess({
              userList,
              nowTurn,
              event: SocketEvent.SetPlayOrder,
            });
            break;
          }
          case SocketEvent.FlipChess: {
            const userList = UserFactory.createArrayFromNet(result.data.roomUserList);
            const chesses = ChineseChessFactory.createArrayFromNet(result.data.gameData || []);
            const nowTurn = result.data.nowTurn || '';
            callbacks.onSuccess({
              chesses,
              nowTurn,
              userList,
              event: SocketEvent.FlipChess
            });
            break;
          }
          case SocketEvent.EatChess:
          case SocketEvent.MoveChess: {
            const chesses = ChineseChessFactory.createArrayFromNet(result.data.gameData || []);
            const nowTurn = result.data.nowTurn || '';

            const redAliveChesses = chesses.filter(c => c.alive && c.side === ChessSide.Red);
            const blackAliveChesses = chesses.filter(c => c.alive && c.side === ChessSide.Black);
            let gameOverObj: TGameOver = {
              isGameOver: false,
            };

            if (!redAliveChesses.length) {
              gameOverObj.isGameOver = true;
              gameOverObj.winnerSide = ChessSide.Black;
            }

            if (!blackAliveChesses.length) {
              gameOverObj.isGameOver = true;
              gameOverObj.winnerSide = ChessSide.Red;
            }

            callbacks.onSuccess({
              chesses,
              nowTurn,
              gameOverObj,
              event: SocketEvent.EatChess,
            });
            break;
          }
        }
      },
      onError: callbacks.onError,
    })
  }
}
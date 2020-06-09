import { GetSocketMessage } from "src/features/games/chinese_chess/use_cases/base/GetSocketMessageUseCaseItf";
import { ChineseChess } from "src/features/games/chinese_chess/source/ChineseChessDataSource";
import { ChineseChessFactory } from "src/features/games/domain/factories/ChineseChessFactory";
import { SocketEvent } from "src/types/Socket";
import { RoomFactory } from "src/features/main/domain/factories/RoomFactory";
import { UserFactory } from "src/features/main/domain/factories/UserFactory";

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
          case SocketEvent.EatChess: {
            const chesses = ChineseChessFactory.createArrayFromNet(result.data.gameData || []);
            const nowTurn = result.data.nowTurn || '';
            callbacks.onSuccess({
              chesses,
              nowTurn,
              event: SocketEvent.EatChess
            });
            break;
          }
        }
      },
      onError: callbacks.onError,
    })
  }
}
import { GetSocketMessage } from "src/features/games/chinese_chess/use_cases/base/GetSocketMessageUseCaseItf";
import { ChineseChess } from "src/features/games/chinese_chess/source/ChineseChessDataSource";
import { ChineseChessFactory } from "src/features/games/domain/factories/ChineseChessFactory";

export class GetSocketMessageUseCase implements GetSocketMessage.UseCase {
  private repository: ChineseChess.DataSource;
  constructor(repository: ChineseChess.DataSource) {
    this.repository = repository;
  }

  execute(inputData: GetSocketMessage.InputData, callbacks: GetSocketMessage.Callbacks) {
    this.repository.getSocketMessage({
      onSuccess: (result) => {
        const chesses = ChineseChessFactory.createArrayFromNet(result.data.gameData || []);
        callbacks.onSuccess({ chesses });
      },
      onError: callbacks.onError,
    })
  }
}
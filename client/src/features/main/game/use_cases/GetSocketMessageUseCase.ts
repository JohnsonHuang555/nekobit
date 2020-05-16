import { Games } from "src/features/main/domain/source/GamesDataSource";
import { SocketEvent } from "src/types/Socket";
import { GetSocketMessage } from "src/features/main/game/use_cases/base/GetSocketMessageUseCaseItf";
import { RoomFactory } from "src/features/main/domain/factories/RoomFactory";

export class GetSocketMessageUseCase implements GetSocketMessage.UseCase {
  private repository: Games.DataSource;

  constructor(repository: Games.DataSource) {
    this.repository = repository;
  }

  execute(inputData: GetSocketMessage.InputData, callbacks: GetSocketMessage.Callbacks) {
    this.repository.getSocketMessage({
      onSuccess: (result) => {
        switch (result.event) {
          case SocketEvent.GetRooms:
            const rooms = RoomFactory.createArrayFromNet(result.data.rooms || []);
            callbacks.onSuccess({ rooms });
            break;
          case SocketEvent.CreateRoom:
            callbacks.onSuccess({ roomID: result.data.roomID });
            break;
        }
      },
      onError: callbacks.onError,
    });
  }
}

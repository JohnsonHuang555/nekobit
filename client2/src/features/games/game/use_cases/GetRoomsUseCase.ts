import { GetRooms } from "src/features/games/game/use_cases/base/GetRoomsUseCaseItf";
import { App } from "src/domain/source/AppDataSource";
import { SocketEvent } from "src/types/Socket";
import { TRoom } from "src/features/games/domain/models/Room";

export class GetRoomsUseCase implements GetRooms.UseCase {
  private repository: App.DataSource;

  constructor(repository: App.DataSource) {
    this.repository = repository;
  }

  execute(inputData: GetRooms.InputData, callbacks: GetRooms.Callbacks) {
    this.repository.sendSocket({ event: SocketEvent.GetRooms }, {
      onSuccess: (result) => {
        const rooms = result.rooms as TRoom[] || [];
        callbacks.onSuccess({ rooms });
      },
      onError: callbacks.onError,
    });
  }
}

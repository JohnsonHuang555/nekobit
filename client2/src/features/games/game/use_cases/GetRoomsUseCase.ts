import { GetRooms } from "src/features/games/game/use_cases/base/GetRoomsUseCaseItf";
import { App } from "src/domain/source/AppDataSource";
import { SocketEvent } from "src/types/Socket";

export class GetRoomsUseCase implements GetRooms.UseCase {
  private repository: App.DataSource;

  constructor(repository: App.DataSource) {
    this.repository = repository;
  }

  execute(inputData: GetRooms.InputData, callbacks: GetRooms.Callbacks) {
    this.repository.sendSocket({ event: SocketEvent.GetRooms }, {
      onError: callbacks.onError,
    });
  }
}

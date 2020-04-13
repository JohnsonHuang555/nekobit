import { Games } from "../../domain/source/GamesDataSource";
import { SocketEvent } from "src/types/Socket";
import { GetSocketMessage } from "./base/GetSocketMessageUseCaseItf";

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
            callbacks.onSuccess({ rooms: result.data.rooms });
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

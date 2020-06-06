import { Games } from "src/features/main/domain/source/GamesDataSource";
import { GetSocketMessage } from "src/features/main/room/use_case/base/GetSocketMessageUseCaseItf";
import { SocketEvent } from "src/types/Socket";
import { UserFactory } from "src/features/main/domain/factories/UserFactory";
import { RoomFactory } from "../../domain/factories/RoomFactory";
import { TRoom } from "../../domain/models/Room";

export class GetSocketMessageUseCase implements GetSocketMessage.UseCase {
  private repository: Games.DataSource;
  private roomInfo: TRoom | null = null;

  constructor(repository: Games.DataSource) {
    this.repository = repository;
  }

  execute(inputData: GetSocketMessage.InputData, callbacks: GetSocketMessage.Callbacks) {
    this.repository.getSocketMessage({
      onSuccess: (result) => {
        switch (result.event) {
          case SocketEvent.JoinRoom: {
            const roomInfo = RoomFactory.createFromNet(result.data.roomInfo);
            this.roomInfo = roomInfo;
            break;
          }
          case SocketEvent.LeaveRoom: {
            const roomInfo = RoomFactory.createFromNet(result.data.roomInfo);
            this.roomInfo = roomInfo;
            break;
          }
          case SocketEvent.ReadyGame: {
            const roomUserList = UserFactory.createArrayFromNet(result.data.roomUserList);
            if (this.roomInfo) {
              this.roomInfo.userList = roomUserList;
            }
            break;
          }
          case SocketEvent.StartGame: {
            const roomInfo = RoomFactory.createFromNet(result.data.roomInfo);
            this.roomInfo = roomInfo;
            break;
          }
          case SocketEvent.SetPlayOrder: {
            const roomInfo = RoomFactory.createFromNet(result.data.roomInfo);
            this.roomInfo = roomInfo;
            break;
          }
        }
        callbacks.onSuccess({ roomInfo: this.roomInfo as TRoom });
      },
      onError: callbacks.onError,
    });
  }
}

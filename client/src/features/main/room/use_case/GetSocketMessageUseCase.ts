import { Games } from "src/features/main/domain/source/GamesDataSource";
import { GetSocketMessage } from "src/features/main/room/use_case/base/GetSocketMessageUseCaseItf";
import { SocketEvent } from "src/types/Socket";
import { UserFactory } from "src/features/main/domain/factories/UserFactory";
import { RoomFactory } from "../../domain/factories/RoomFactory";

export class GetSocketMessageUseCase implements GetSocketMessage.UseCase {
  private repository: Games.DataSource;

  constructor(repository: Games.DataSource) {
    this.repository = repository;
  }

  execute(inputData: GetSocketMessage.InputData, callbacks: GetSocketMessage.Callbacks) {
    const { roomInfo } = inputData;
    this.repository.getSocketMessage({
      onSuccess: (result) => {
        let newRoomInfo = {...roomInfo};
        switch (result.event) {
          case SocketEvent.JoinRoom: {
            const roomInfo = RoomFactory.createFromNet(result.data.roomInfo);
            console.log(roomInfo);
            newRoomInfo = roomInfo;
            break;
          }
          case SocketEvent.LeaveRoom: {
            const roomInfo = RoomFactory.createFromNet(result.data.roomInfo);
            newRoomInfo = roomInfo;
            break;
          }
          case SocketEvent.ReadyGame: {
            const roomUserList = UserFactory.createArrayFromNet(result.data.roomUserList);
            newRoomInfo.userList = roomUserList;
            break;
          }
          case SocketEvent.StartGame: {
            const roomInfo = RoomFactory.createFromNet(result.data.roomInfo);
            newRoomInfo = roomInfo;
            break;
          }
        }
        callbacks.onSuccess({ roomInfo: newRoomInfo });
      },
      onError: callbacks.onError,
    });
  }
}

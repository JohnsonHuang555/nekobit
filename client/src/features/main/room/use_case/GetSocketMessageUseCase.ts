import { Games } from "../../domain/source/GamesDataSource";
import { GetSocketMessage } from "./base/GetSocketMessageUseCaseItf";
import { SocketEvent } from "src/types/Socket";
import { UserFactory } from "../../domain/factories/UserFactory";

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
          case SocketEvent.JoinRoom:
            const roomUserList = UserFactory.createArrayFromNet(result.data.roomUserList);
            newRoomInfo.userList = roomUserList;
            break;
          case SocketEvent.LeaveRoom:
            newRoomInfo = result.data.roomInfo;
            break;
          case SocketEvent.ReadyGame:
            newRoomInfo.userList = result.data.roomUserList;
            break;
          case SocketEvent.StartGame:
            newRoomInfo = result.data.roomInfo;
            break;
        }
        callbacks.onSuccess({ roomInfo: newRoomInfo });
      },
      onError: callbacks.onError,
    });
  }
}

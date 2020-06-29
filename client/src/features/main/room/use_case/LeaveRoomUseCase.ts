import { LeaveRoom } from "./base/LeaveRoomUseCaseItf";
import { Games } from "../../domain/source/GamesDataSource";

export class LeaveRoomUseCase implements LeaveRoom.UseCase {
  private repository: Games.DataSource;

  constructor(repository: Games.DataSource) {
    this.repository = repository;
  }

  execute(inputData: LeaveRoom.InputData) {
    const {
      roomID,
      userID,
    } = inputData;

    this.repository.leaveRoom(roomID, userID);
  }
}

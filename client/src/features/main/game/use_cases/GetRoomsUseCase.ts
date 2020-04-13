import { GetRooms } from "src/features/main/game/use_cases/base/GetRoomsUseCaseItf";
import { Games } from "../../domain/source/GamesDataSource";

export class GetRoomsUseCase implements GetRooms.UseCase {
  private repository: Games.DataSource;

  constructor(repository: Games.DataSource) {
    this.repository = repository;
  }

  execute(inputData: GetRooms.InputData, callbacks: GetRooms.Callbacks) {
    this.repository.getRooms();
  }
}

import { Games } from "../../domain/source/GamesDataSource";
import { SetPlayOrder } from "./base/SetPlayOrderUseCaseItf";

export class SetPlayOrderUseCase implements SetPlayOrder.UseCase {
  private repository: Games.DataSource;

  constructor(repository: Games.DataSource) {
    this.repository = repository;
  }

  execute(inputData: SetPlayOrder.InputData) {
    const {
      roomID,
    } = inputData;

    this.repository.setPlayOrder(roomID);
  }
}

import { Games } from "../../domain/source/GamesDataSource";
import { ChangePassword } from "./base/ChangePasswordUseCaseItf";

export class ChangePasswordUseCase implements ChangePassword.UseCase {
  private repository: Games.DataSource;

  constructor(repository: Games.DataSource) {
    this.repository = repository;
  }

  execute(inputData: ChangePassword.InputData) {
    const {
      roomID,
      password,
    } = inputData;

    this.repository.changePassword(roomID, password);
  }
}

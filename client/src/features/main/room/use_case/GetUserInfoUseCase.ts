import { Games } from "../../domain/source/GamesDataSource";
import { GetUserInfo } from "./base/GetUserInfoUseCaseItf";

export class GetUserInfoUseCase implements GetUserInfo.UseCase {
  private repository: Games.DataSource;

  constructor(repository: Games.DataSource) {
    this.repository = repository;
  }

  execute(inputData: GetUserInfo.InputData, callbacks: GetUserInfo.Callbacks) {
    this.repository.getUserInfo({
      onSuccess: (result) => {
        callbacks.onSuccess({ userInfo: result });
      },
      onError: callbacks.onError,
    });
  }
}

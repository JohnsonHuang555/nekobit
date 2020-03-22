import { SuccessCallback, ErrorCallback } from "src/domain/source/base/RepositoryCallbacks";
import { TRegister } from "src/features/account/domain/models/Account";

export namespace Account {
  export interface DataSource {
    login(account: string, password: string,
      callbacks: Account.LoginCallbacks
    ): void;

    register(name: string, account: string, password: string,
      callbacks: Account.RegisterCallbacks
    ): void;
  }

  export interface LoginCallbacks extends SuccessCallback<boolean>, ErrorCallback {}
  export interface RegisterCallbacks extends SuccessCallback<TRegister>, ErrorCallback {}
}

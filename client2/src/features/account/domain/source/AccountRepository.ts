import { IFetcher } from "src/api/Fetcher";
import { Account } from "src/features/account/domain/source/AccountDataSource";
import { NetLogin, NetRegister } from "src/features/account/domain/remote/NetAccount";

export default class AccountRepository implements Account.DataSource {
  private fetcher: IFetcher;

  constructor(fetcher: IFetcher) {
    this.fetcher = fetcher;
  }

  login(account: string, password: string, callbacks: Account.LoginCallbacks): void {
    this.fetcher.post('/account/login', {
      onSuccess: (result: NetLogin) => {
        callbacks.onSuccess(result.success);
      },
      onError: (e) => {
        callbacks.onError(e);
      }
    }, { account, password });
  }

  register(name: string, account: string, password: string, callbacks: Account.RegisterCallbacks): void {
    this.fetcher.post('/account/register', {
      onSuccess:(result: NetRegister) => {
        callbacks.onSuccess(result);
      },
      onError:(e) => {
        callbacks.onError(e);
      }
    }, { name, account, password });
  }
}
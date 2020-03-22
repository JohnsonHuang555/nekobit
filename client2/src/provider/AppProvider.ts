import Fetcher, { IFetcher } from 'src/api/Fetcher';
import AccountRepository from 'src/features/account/domain/source/AccountRepository';
import GamesRepository from 'src/features/games/domain/source/GamesRepository';
import AppRepository from 'src/domain/source/AppRepository';

class AppProvider {
  public readonly fetcher: IFetcher;
  public readonly appRepository: AppRepository;
  public readonly accountRepository: AccountRepository;
  public readonly gamesRepository: GamesRepository;

  constructor() {
    this.fetcher = Fetcher.init();
    this.appRepository = new AppRepository();
    this.accountRepository = new AccountRepository(this.fetcher);
    this.gamesRepository = new GamesRepository(this.fetcher);
  }
}

const appProvider = new AppProvider();

export default appProvider;

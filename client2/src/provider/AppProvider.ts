import Fetcher, { IFetcher } from 'src/api/Fetcher';
import AccountRepository from 'src/features/account/domain/source/AccountRepository';
import GamesRepository from 'src/features/games/domain/source/GamesRepository';

class AppProvider {
  public readonly fetcher: IFetcher;
  public readonly accountRepository: AccountRepository;
  public readonly gamesRepository: GamesRepository;

  constructor() {
    this.fetcher = Fetcher.init();
    this.accountRepository = new AccountRepository(this.fetcher);
    this.gamesRepository = new GamesRepository(this.fetcher);
  }
}

const appProvider = new AppProvider();

export default appProvider;

import { UseCaseHandler } from 'src/domain/usecases/base/UseCaseHandler';
import Fetcher, { IFetcher } from 'src/api/Fetcher';
import AccountRepository from 'src/features/account/domain/source/AccountRepository';
import GamesRepository from 'src/features/main/domain/source/GamesRepository';
import ChineseChessRepository from 'src/features/games/chinese_chess/source/ChinenesChessRepository';

class AppProvider {
  public readonly fetcher: IFetcher;
  public readonly useCaseHandler: UseCaseHandler;
  public readonly accountRepository: AccountRepository;
  public readonly gamesRepository: GamesRepository;
  public readonly chineseChessRepository: ChineseChessRepository;

  constructor() {
    this.fetcher = Fetcher.init();
    this.useCaseHandler = UseCaseHandler.INSTANCE;
    this.accountRepository = new AccountRepository(this.fetcher);
    this.gamesRepository = new GamesRepository(this.fetcher);

    // games
    this.chineseChessRepository = new ChineseChessRepository(this.fetcher);
  }
}

const appProvider = new AppProvider();

export default appProvider;

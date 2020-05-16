import _ from 'lodash';
import { TGame } from "src/features/main/domain/models/Game";
import { NetGame } from "src/features/main/domain/remote/NetGame";

export class GameFactory {
  static createArrayFromNet(netGames: NetGame[]): TGame[] {
    return netGames.map((netGame) => this.createFromNet(netGame));
  }

  static createFromNet(netGame: NetGame): TGame {
    return _.mapKeys(netGame, (value, key) => (_.camelCase(key))) as TGame;
  }
}

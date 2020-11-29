import _ from 'lodash';
import { NetGame } from 'domain/remote/NetGame';
import { Game } from 'domain/models/Game';

export class GameFactory {
  static createArrayFromNet(netGames: NetGame[]): Game[] {
    return netGames.map((netGame) => this.createFromNet(netGame));
  }

  static createFromNet(netGame: NetGame): Game {
    return _.mapKeys(netGame, (v, key) => (_.camelCase(key))) as Game;
  }
}

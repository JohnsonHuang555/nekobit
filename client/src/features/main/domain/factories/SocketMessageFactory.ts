import _ from 'lodash';
import { TSocket } from 'src/types/Socket';

export class GameFactory {
  static createFromNet(netSocketMessage: TSocket): TSocket {
    return _.mapKeys(netSocketMessage, (value, key) => (_.camelCase(key))) as TSocket;
  }
}

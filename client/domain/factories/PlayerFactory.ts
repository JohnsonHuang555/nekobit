import _ from 'lodash';
import { Player } from 'domain/models/Player';
import { NetPlayer } from 'domain/remote/NetPlayer';

export class PlayerFactory {
  static createFromNet(netUser: NetPlayer): Player {
    return _.mapKeys(netUser, (value, key) => (_.camelCase(key))) as Player;
  }

  static createArrayFromNet(netUsers: NetPlayer[] = []): Player[] {
    return netUsers.map((netUser) => this.createFromNet(netUser)) as Player[];
  }
}

import _ from 'lodash';
import { Room } from 'domain/models/Room';
import { NetRoom } from 'domain/remote/NetRoom';
import { PlayerFactory } from './PlayerFactory';

export class RoomFactory {
  static createArrayFromNet(netRooms: NetRoom[]): Room[] {
    return netRooms.map((netRoom) => this.createFromNet(netRoom));
  }

  static createFromNet(netRoom: NetRoom): Room {
    console.log(netRoom, 'ddkdkddk')
    const room = _.mapKeys(netRoom, (value, key) => (_.camelCase(key))) as Room;
    room.playerList = PlayerFactory.createArrayFromNet(netRoom.player_list);
    return room;
  }
}

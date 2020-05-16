import _ from 'lodash';
import { NetRoom } from 'src/features/main/domain/remote/NetRoom';
import { TRoom } from 'src/features/main/domain/models/Room';
import { UserFactory } from 'src/features/main/domain/factories/UserFactory';

export class RoomFactory {
  static createArrayFromNet(netRooms: NetRoom[]): TRoom[] {
    return netRooms.map((netRoom) => this.createFromNet(netRoom));
  }

  static createFromNet(netRoom: NetRoom): TRoom {
    const room = _.mapKeys(netRoom, (value, key) => (_.camelCase(key))) as TRoom;
    room.userList = UserFactory.createArrayFromNet(netRoom.user_list);
    return room;
  }
}

import _ from 'lodash';
import { NetUser } from 'src/features/main/domain/remote/NetUser';
import { TRoomUser } from '../models/Room';

export class UserFactory {
  static createFromNet(netUser: NetUser): TRoomUser {
    return _.mapKeys(netUser, (value, key) => (_.camelCase(key))) as TRoomUser;
  }

  static createArrayFromNet(netUsers: NetUser[]): TRoomUser[] {
    return netUsers.map((netUser) => this.createFromNet(netUser)) as TRoomUser[];
  }
}

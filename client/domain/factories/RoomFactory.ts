import _ from "lodash";
import { Room } from "domain/models/Room";
import { NetRoom } from "domain/remote/NetRoom";
import { nestedToJsCase } from "helpers/ajaxConverter";

export class RoomFactory {
  static createArrayFromNet(netRooms: NetRoom[]): Room[] {
    return netRooms.map((netRoom) => this.createFromNet(netRoom));
  }

  static createFromNet(netRoom: NetRoom): Room {
    const room = nestedToJsCase(netRoom) as Room;
    return room;
  }
}

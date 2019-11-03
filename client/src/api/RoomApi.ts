import api from '../utils/ApiSetting';

export default {
  getRooms(gameName: string) {
    return api.execute('get', `/getRooms/${gameName}`);
  },
  // FIXME:Type define
  createRoom(roomData: any) {
    return api.execute('post', '/createRoom', roomData);
  },
  getRoomInfo(id: string) {
    return api.execute('get', `/getRoomInfo/${id}`);
  }
}
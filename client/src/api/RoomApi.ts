import api from './Setting';

export default {
  getRooms(gameName: string) {
    return api.execute('get', `/getRooms/${gameName}`);
  },
  // FIXME:Type define
  createRoom(roomData: any) {
    return api.execute('post', '/createRoom', roomData)
  }
}
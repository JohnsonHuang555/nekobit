import api from '../utils/ApiSetting';

export default {
  getAllGames() {
    return api.execute('get', '/getAllGames');
  },
  getGameInfo(id: string) {
    return api.execute('get', `/getGameInfo/${id}`);
  }
}
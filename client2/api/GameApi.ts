import api from '../utils/ApiSetting';

export default {
  getAllGames() {
    return api.execute('get', '/getAllGames');
  },
  getGameInfo(gameName: string) {
    return api.execute('get', `/getGameInfo/${gameName}`);
  }
}
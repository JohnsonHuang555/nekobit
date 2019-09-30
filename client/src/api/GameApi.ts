import api from './Setting';

export default {
  getAllGames() {
    return api.execute('get', '/getAllGames');
  }
}
import api from '../utils/ApiSetting';

interface User {
  account: string;
  password: string;
}

export default {
  login(userData: User) {
    return api.execute('post', '/login', userData)
  }
}
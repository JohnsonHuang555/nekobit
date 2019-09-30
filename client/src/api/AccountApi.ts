import api from './Setting';

interface User {
  account: string;
  password: string;
}

export default {
  login(userData: User) {
    return api.execute('post', '/login', userData)
  }
}
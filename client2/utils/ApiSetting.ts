import axios from 'axios';

const client = axios.create({
  baseURL: 'http://localhost:8080/api',
  headers: {
    'Content-Type': 'application/x-www-form-urlencoded'
  }
});

export default {
  async execute(method: any, resource: string, data?: any) {
    return client({
      method,
      url: resource,
      data,
    }).then(req => {
      return req.data
    }).catch(err => {
      console.log(err);
    })
  }
};
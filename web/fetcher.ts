import axios, { AxiosRequestConfig } from 'axios';

const config: AxiosRequestConfig = {
  baseURL: 'http://localhost:5000/api',
  timeout: 60000,
  responseType: 'json',
};

export const getApi = (url: string) => {
  return axios.get(url, config);
};

export const postApi = (url: string, data: any) => {
  return axios.post(url, data, config);
};

export const putApi = (url: string, data: any) => {
  return axios.put(url, data, config);
};

export const deleteApi = (url: string, data: any) => {
  return axios.delete(url, config);
};

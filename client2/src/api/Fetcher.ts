import axios, { AxiosRequestConfig, AxiosInstance } from 'axios';

type FetcherRequestConfig = {
  params?: object;
  paramsSerializer?: (params: object) => string;
};

interface FetcherCallbacks<T> {
  onSuccess: (body: T) => void;
  onError: (error: Error) => void;
}

export interface IFetcher {
  get<T = any>(path: string, callbacks: FetcherCallbacks<T>, config?: FetcherRequestConfig): Promise<void>;
  post<T = any>(path: string, callbacks: FetcherCallbacks<T>, body?: any): Promise<void>;
  put<T = any>(path: string, callbacks: FetcherCallbacks<T>, body?: any): Promise<void>;
  delete<T = any>(path: string, callbacks: FetcherCallbacks<T>, body?: any): Promise<void>;
}

export default class Fetcher implements IFetcher {
  private client: AxiosInstance;
  private static theFetcher: null | Fetcher = null;

  constructor() {
    this.client = axios.create({
      baseURL: 'http://localhost:8080/api',
      headers: {
        'Content-Type': 'application/x-www-form-urlencoded'
      }
    });
  }

  static init(): IFetcher {
    if (Fetcher.theFetcher === null) {
      Fetcher.theFetcher = new Fetcher();
    }

    return Fetcher.theFetcher;
  }

  async get<T = any>(path: string, callbacks: FetcherCallbacks<T>, config?: FetcherRequestConfig): Promise<void> {
    await this.client.get(path, config)
      .then(res => callbacks.onSuccess(res.data))
      .catch(error => callbacks.onError(error));
  }

  async post<T = any>(path: string, callbacks: FetcherCallbacks<T>, body?: any): Promise<void> {
    await this.client.post(path, body)
      .then(res => callbacks.onSuccess(res.data))
      .catch(error => callbacks.onError(error));
  }

  async put<T = any>(path: string, callbacks: FetcherCallbacks<T>, body?: any): Promise<void> {
    await this.client.put(path, body)
      .then(res => callbacks.onSuccess(res.data))
      .catch(error => callbacks.onError(error));
  }

  async delete<T = any>(path: string, callbacks: FetcherCallbacks<T>, body?: any): Promise<void> {
    const options: AxiosRequestConfig = {
      data: body,
    };
    await this.client.delete(path, options)
      .then(res => callbacks.onSuccess(res.data))
      .catch(error => callbacks.onError(error));
  }
}


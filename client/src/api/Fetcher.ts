import axios, { AxiosRequestConfig, AxiosInstance } from 'axios';
import { SuccessWithoutResultCallback, ErrorCallback, SuccessCallback } from 'src/domain/source/base/RepositoryCallbacks';
import { TSocket } from 'src/types/Socket';

type FetcherRequestConfig = {
  params?: object;
  paramsSerializer?: (params: object) => string;
};

interface FetcherCallbacks<T> {
  onSuccess: (body: T) => void;
  onError: (error: Error) => void;
}

interface CreateSocketCallbacks extends SuccessWithoutResultCallback, ErrorCallback {}
interface GetSocketMessageCallbacks extends SuccessCallback<TSocket>, ErrorCallback {}

export interface IFetcher {
  get<T = any>(path: string, callbacks: FetcherCallbacks<T>, config?: FetcherRequestConfig): Promise<void>;
  post<T = any>(path: string, callbacks: FetcherCallbacks<T>, body?: any): Promise<void>;
  put<T = any>(path: string, callbacks: FetcherCallbacks<T>, body?: any): Promise<void>;
  delete<T = any>(path: string, callbacks: FetcherCallbacks<T>, body?: any): Promise<void>;
  createSocket(path: string, callbacks: CreateSocketCallbacks): void;
  sendSocket(data: TSocket): void;
  getSocketMessage(callbacks: GetSocketMessageCallbacks): void;
}

const DOMAIN = 'localhost:8080'
const SOCKET_PATH = `ws://${DOMAIN}/ws`;

export default class Fetcher implements IFetcher {
  private client: AxiosInstance;
  private static theFetcher: null | Fetcher = null;

  private socket: WebSocket | null;
  private socketPath: string;

  constructor() {
    this.client = axios.create({
      baseURL: `http://${DOMAIN}/api`,
      headers: {
        'Content-Type': 'application/x-www-form-urlencoded'
      }
    });

    this.socket = null;
    this.socketPath = '';
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

  // socket
  createSocket(path: string, callbacks: CreateSocketCallbacks): void {
    // not equal means change route or create new socket
    if (path !== this.socketPath) {
      // clear socket
      this.removeSocket();
      this.socketPath = path;
      console.log(`${SOCKET_PATH}/${this.socketPath}`)

      this.socket = new WebSocket(`${SOCKET_PATH}/${this.socketPath}`);
      this.socket.onopen = () => {
        callbacks.onSuccess();
      }

      this.socket.onerror = () => {
        callbacks.onError(new Error('connect socket failed'));
      }
    }
  }

  sendSocket(data: TSocket): void {
    if (this.socket) {
      this.socket.send(JSON.stringify(data));
    }
  }

  getSocketMessage(callbacks: GetSocketMessageCallbacks): void {
    if (this.socket) {
      this.socket.onmessage = (webSocket: MessageEvent) => {
        const wsData: TSocket = JSON.parse(webSocket.data);
        callbacks.onSuccess(wsData);
      }
    } else {
      const error = new Error('Connect failed. Please try again...');
      callbacks.onError(error);
    }
  }

  private removeSocket(): void {
    if (this.socket !== null) {
      this.socket.close();
      this.socket = null;
    }
  }
}


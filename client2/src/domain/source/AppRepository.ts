import { App } from "src/domain/source/AppDataSource";
import { TSocket } from "src/types/Socket";

const SOCKET_PATH = 'ws://localhost:8080/ws';

export default class AppRepository implements App.DataSource {
  private socket: WebSocket | null;
  private socketPath: string;

  constructor() {
    this.socket = null;
    this.socketPath = '';
  }

  createSocket(path: string, callbacks: App.CreateSocketCallbacks): void {
    // not equal means change route or create new socket
    if (path !== this.socketPath) {
      // clear socket
      this.removeSocket();
      this.socketPath = path;

      this.socket = new WebSocket(`${SOCKET_PATH}/${this.socketPath}`);
      this.socket.onopen = () => {
        callbacks.onSuccess();
      }

      this.socket.onerror = () => {
        callbacks.onError(new Error('connect socket failed'));
      }
    }
  }

  sendSocket(data: TSocket, callbacks: App.SendSocketCallbacks): void {
    if (this.socket) {
      this.socket.send(JSON.stringify(data));
      this.getSocketMessage({
        onSuccess: (result) => {
          callbacks.onSuccess(result);
        },
        onError: e => callbacks.onError(e)
      });
    } else {
      const error = new Error('Connect failed. Please try again...');
      callbacks.onError(error);
    }
  }

  private getSocketMessage(callbacks: App.SendSocketCallbacks): void {
    if (this.socket) {
      this.socket.onmessage = (webSocket: MessageEvent) => {
        const wsData: TSocket = JSON.parse(webSocket.data);
        callbacks.onSuccess(wsData.data);
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

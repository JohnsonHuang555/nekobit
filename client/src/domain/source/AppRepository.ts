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
}

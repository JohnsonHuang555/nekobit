import { TSocket } from 'src/types/Socket';
import { ErrorCallback, SuccessWithoutResultCallback, SuccessCallback } from "src/domain/source/base/RepositoryCallbacks";

export namespace App {
  export interface DataSource {
    createSocket(path: string, callbacks: App.CreateSocketCallbacks): void;
    getSocketMessage(callbacks: App.GetSocketMessageCallbacks): void;
    sendSocket(data: TSocket, callbacks: App.SendSocketCallbacks): void;
  }

  export interface CreateSocketCallbacks extends SuccessWithoutResultCallback, ErrorCallback {}
  export interface GetSocketMessageCallbacks extends SuccessCallback<any>, ErrorCallback {}
  export interface SendSocketCallbacks extends ErrorCallback {}
}

import { ActionType } from 'actions/WebSocketAction';

let webSocket: WebSocket;
const socketMiddleware = (store: any) => (next: any) => (action: any) => {
  switch (action.type) {
    case ActionType.WS_CONNECT: {
      webSocket = new WebSocket(action.host);

      webSocket.onopen = () => {
        console.log('connected')
      }

      webSocket.onclose = () => {
        console.log('close')
      }

      webSocket.onmessage = (e) => {

      }
      break;
    }
    case ActionType.WS_SEND_MESSAGE: {
      break;
    }
    case ActionType.WS_DISCONNECT: {
      webSocket.close();
      break;
    }
  }
  // socket.onopen = () => {
  // }
  // socket.onmessage = (event) => {
  //   const data = JSON.parse(event.data)
  //   switch (data.type) {
  //     case ActionType.JoinRoom:
  //       // dispatch(messageReceived(data.message, data.author))
  //       break
  //     case ActionType.LeaveRoom:
  //       // dispatch(populateUsersList(data.users))
  //       break
  //     default:
  //       break
  //   }
  // }

  // return socket
  return next(action);
}

export default socketMiddleware

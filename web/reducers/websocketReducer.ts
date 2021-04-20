import { ActionType } from 'actions/WebSocketAction';

export type State = {
  isConnected: boolean;
};

const initialState: State = {
  isConnected: false,
};

type ConnectedWsAction = {
  type: ActionType.WS_CONNECTED;
};

type DisConnectedWsAction = {
  type: ActionType.WS_DISCONNECTED;
};

type Action = ConnectedWsAction | DisConnectedWsAction;

const reducer = (state = initialState, action: Action): State => {
  switch (action.type) {
    case ActionType.WS_CONNECTED: {
      return {
        ...state,
        isConnected: true,
      };
    }
    case ActionType.WS_DISCONNECTED: {
      return {
        ...state,
        isConnected: false,
      };
    }
    default: {
      return state;
    }
  }
};

export default reducer;

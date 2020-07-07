import { TGame } from 'src/features/main/domain/models/Game';

export type State = {
  gameInfo?: TGame;
};

export const defaultState: State = {};

export enum ActionType {
  GET_GAME_INFO = 'GET_GAME_INFO',
  GET_GAME_INFO_SUCCESS = 'GET_GAME_INFO_SUCCESS',
}

export type LoadGameInfoAction = {
  type: ActionType.GET_GAME_INFO_SUCCESS,
  gameInfo: TGame;
};

export type Action = LoadGameInfoAction;

const reducer = (state: State = defaultState, action: Action): State => {
  switch (action.type) {
    case ActionType.GET_GAME_INFO_SUCCESS: {
      return {
        ...state,
        gameInfo: action.gameInfo,
      }
    }
    default: {
      return state;
    }
  }
};

export default reducer;

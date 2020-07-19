import { TGame } from 'src/features/main/domain/models/Game';

export type State = {
  games: TGame[];
};

export const defaultState: State = {
  games: [],
};

export enum ActionType {
  GET_GAMES = 'GET_GAMES',
  GET_GAMES_SUCCESS = 'GET_GAMES_SUCCESS',
};

export type LoadGamesAction = {
  type: ActionType.GET_GAMES_SUCCESS,
  games: TGame[],
};

export type Action = LoadGamesAction;

const reducer = (state: State = defaultState, action: Action): State => {
  switch (action.type) {
    case ActionType.GET_GAMES_SUCCESS: {
      return {
        ...state,
        games: action.games,
      };
    }
    default: {
      return state;
    }
  }
};

export default reducer;

import { TGame } from 'src/features/main/domain/models/Game';

export type State = {
  games: TGame[];
};

export const defaultState: State = {
  games: [],
};

export enum ActionType {
  GamesLoaded = 'main/index/load_games',
};

export type LoadGamesAction = {
  type: ActionType.GamesLoaded,
  games: TGame[],
};

export type Action = LoadGamesAction;

const reducer = (state: State = defaultState, action: Action): State => {
  switch (action.type) {
    case ActionType.GamesLoaded: {
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

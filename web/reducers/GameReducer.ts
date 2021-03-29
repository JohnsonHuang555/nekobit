import { ActionType } from 'actions/GameAction';
import { Game } from 'domain/models/Game';

export type State = {
  games: Game[] | null;
};

const initialState: State = {
  games: null,
};

type LoadedGamesAction = {
  type: ActionType.LOAD_GAMES_SUCCESS;
  games: Game[];
};

type Action = LoadedGamesAction;

const reducer = (state = initialState, action: Action) => {
  switch (action.type) {
    case ActionType.LOAD_GAMES_SUCCESS: {
      return {
        ...state,
        ...{ games: action.games },
      };
    }
    default: {
      return state;
    }
  }
};

export default reducer;

import { ActionType } from 'actions/GameAction';
import { Game } from 'domain/models/Game';

export type State = {
  games: Game[] | null;
  gameInfo: Game | null;
};

const initialState: State = {
  games: null,
  gameInfo: null,
};

type LoadedGamesAction = {
  type: ActionType.LOAD_GAMES_SUCCESS;
  games: Game[];
};

type LoadedGameInfoAction = {
  type: ActionType.LOAD_GAME_INFO_SUCCESS;
  game: Game;
};

type Action = LoadedGamesAction | LoadedGameInfoAction;

const reducer = (state = initialState, action: Action) => {
  switch (action.type) {
    case ActionType.LOAD_GAMES_SUCCESS: {
      return {
        ...state,
        ...{ games: action.games },
      };
    }
    case ActionType.LOAD_GAME_INFO_SUCCESS: {
      return {
        ...state,
        ...{ gameInfo: action.game },
      };
    }
    default: {
      return state;
    }
  }
};

export default reducer;

import { Game } from 'domain/models/Game';
import { LoadedGamesAction, GET_GAMES_SUCCESS } from 'actions/gameAction'
import { HYDRATE } from 'next-redux-wrapper'

export type State = {
  games: Game[] | null;
};

export const initialState: State = {
  games: null,
}

const reducer = (state: State = initialState, action: LoadedGamesAction) => {
  switch (action.type) {
    case HYDRATE: {
      return { ...state, ...action.payload }
    }
    case GET_GAMES_SUCCESS: {
      return { ...state, ...action.payload };
    }
    default: {
      return state;
    }
  }
}

export default reducer;

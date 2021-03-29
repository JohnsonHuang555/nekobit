import { Game } from 'domain/models/Game';

export enum ActionType {
  FAILURE = 'FAILURE',
  LOAD_GAMES = 'LOAD_GAMES',
  LOAD_GAMES_SUCCESS = 'LOAD_GAMES_SUCCESS',
  HYDRATE = 'HYDRATE',
}

export const failure = (error: Error) => {
  return {
    type: ActionType.FAILURE,
    error,
  };
};

export const loadGames = () => {
  return {
    type: ActionType.LOAD_GAMES,
  };
};

export const loadGamesSuccess = (games: Game[]) => {
  return {
    type: ActionType.LOAD_GAMES_SUCCESS,
    games,
  };
};

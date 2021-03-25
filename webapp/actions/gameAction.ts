import { Game } from 'domain/models/Game';

export const actionTypes = {
  LOAD_GAMES: 'LOAD_GAMES',
  LOADED_GAMES: 'LOADED_GAMES',
};

export function loadGames() {
  return {
    type: actionTypes.LOAD_GAMES,
  };
}

export function loadedGames(data: Game[]) {
  return {
    type: actionTypes.LOADED_GAMES,
    data,
  };
}

// import { Game } from 'domain/models/Game';

// export enum ActionType {
//   LOAD_GAMES = 'GAME$LOAD_GAMES',
//   LOADED_GAMES = 'GAME$LOADED_GAMES'
// }

// export function loadGames() {
//   return {
//     type: ActionType.LOAD_GAMES,
//   };
// }

// export function loadedGames(data: Game[]) {
//   return {
//     type: ActionType.LOADED_GAMES,
//     data,
//   };
// }

import { Game } from 'domain/models/Game'

export const GET_GAMES_BEGIN = 'GET_GAMES_BEGIN';
export const GET_GAMES_SUCCESS = 'GET_GAMES_SUCCESS';

export interface LoadedGamesAction {
  type: string;
  payload: Game[];
}

export const getGamesBegin = () => ({
  type: GET_GAMES_BEGIN
});

export const getGamesSuccess = (games: Game[]): LoadedGamesAction => ({
  type: GET_GAMES_SUCCESS,
  payload: games,
})

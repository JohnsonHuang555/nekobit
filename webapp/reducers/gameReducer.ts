import { actionTypes } from 'actions/gameAction';
import { Game } from 'domain/models/Game';

export type State = {
  games: Game[];
};

export enum ActionType {

}

export type LoadedGamesAction = {
  type:
}

export type Action = {

}

const initialState: State = {
  games: [],
}

const reducer = (state: State = initialState, action: Action) => {
  switch (action.type) {
    case value:

      break;

    default:
      break;
  }
}
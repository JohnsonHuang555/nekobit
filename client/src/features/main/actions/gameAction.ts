import { ActionType } from "../reducers/gameReducer";

export type GetGameInfoAction = {
  type: ActionType.GET_GAME_INFO,
  id: string;
};

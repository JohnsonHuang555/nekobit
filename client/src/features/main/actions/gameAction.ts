import { ActionType } from "../reducers/gameReducer";
import { TCreateRoom } from "../domain/models/Game";

export type GetGameInfoAction = {
  type: ActionType.GET_GAME_INFO,
  id: string;
};

export type CreateRoomAction = {
  type: ActionType.CREATE_ROOM,
  createRoomData: TCreateRoom;
};

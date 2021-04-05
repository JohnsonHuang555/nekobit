import { ActionType as RoomActionType  } from "actions/RoomAction";

export type WebSocketParams = {
  event: RoomActionType;
  player_id: string;
  data?: any;
};

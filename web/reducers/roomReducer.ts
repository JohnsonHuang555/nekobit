import { ActionType } from 'actions/RoomAction';
import { Room } from 'domain/models/Room';

export type State = {
  rooms: Room[] | null;
};

const initialState: State = {
  rooms: null,
};

type LoadedRoomsAction = {
  type: ActionType.LOAD_ROOMS_SUCCESS;
  rooms: Room[];
};

type Action = LoadedRoomsAction;

const reducer = (state = initialState, action: Action) => {
  switch (action.type) {
    case ActionType.LOAD_ROOMS_SUCCESS: {
      return {
        ...state,
        ...{ rooms: action.rooms },
      };
    }
    default: {
      return state;
    }
  }
};

export default reducer;

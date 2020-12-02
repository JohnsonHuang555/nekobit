import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import { createRoom, loadRooms } from "actions/roomsAction";
import { Room } from "domain/models/Room";

export type State = {
  rooms: Room[];
  selectedRoom?: Room;
  createdId: string;
  loading: boolean;
};

export type CaseReducer = {
  joinRoom: (state: State, action: PayloadAction<Room>) => void;
};

const roomsSlice = createSlice<State, CaseReducer>({
  name: 'rooms',
  initialState: {
    rooms: [],
    selectedRoom: undefined,
    createdId: '',
    loading: false,
  },
  reducers: {
    joinRoom: (state: State, action: PayloadAction<Room>) => {
      state.selectedRoom = action.payload;
    },
  },
  extraReducers: {
    [loadRooms.pending.toString()]: (state) => {
      state.loading = true;
    },
    [loadRooms.fulfilled.toString()]: (state, action: PayloadAction<Room[]>) => {
      state.rooms = action.payload;
      state.loading = false;
    },
    [createRoom.pending.toString()]: (state) => {
      state.loading = true;
    },
    [createRoom.fulfilled.toString()]: (state, action: PayloadAction<string>) => {
      state.createdId = action.payload;
      state.loading = false;
    },
  },
});

export const {
  joinRoom,
} = roomsSlice.actions;

export default roomsSlice.reducer;

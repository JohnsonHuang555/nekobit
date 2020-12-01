import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import { createRoom, loadRooms } from "actions/roomsAction";
import { Room } from "domain/models/Room";

export type initialState = {
  rooms: Room[];
  selectedRoom?: Room;
  createdId: string;
  loading: boolean;
};

export type CaseReducer = {};

const roomsSlice = createSlice<initialState, CaseReducer>({
  name: 'rooms',
  initialState: {
    rooms: [],
    selectedRoom: undefined,
    createdId: '',
    loading: false,
  },
  reducers: {},
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

export default roomsSlice.reducer;

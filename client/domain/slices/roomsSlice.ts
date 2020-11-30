import { createSlice } from "@reduxjs/toolkit";
import { Room } from "domain/models/Room";

export type initialState = {
  rooms: Room[];
  selectedRoom?: Room;
  loading: boolean;
};

const roomsSlice = createSlice<initialState, any, any>({
  name: 'rooms',
  initialState: {
    rooms: [],
    selectedRoom: undefined,
    loading: false,
  },
  reducers: {},
  extraReducers: {},
});

export default roomsSlice.reducer;

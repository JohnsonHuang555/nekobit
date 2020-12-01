import { createSelector } from "@reduxjs/toolkit";
import { StoreState } from "store";

export const selectRooms = createSelector(
  (state: StoreState) => ({
    rooms: state.rooms.rooms,
  }),
  (state) => state,
);

export const selectRoomInfo = createSelector(
  (state: StoreState) => ({
    selectedRoom: state.rooms.selectedRoom,
  }),
  (state) => state,
);

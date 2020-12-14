import { createSelector } from "@reduxjs/toolkit";
import { StoreState } from "store";

export const selectChineseChesses = createSelector(
  (state: StoreState) => ({
    chineseChesses: state.app.showModal,
  }),
  (state) => state,
);

import { createSelector } from "@reduxjs/toolkit";
import { StoreState } from "store";

export const selectShowModal = createSelector(
  (state: StoreState) => ({
    showModal: state.app.showModal,
  }),
  (state) => state,
);
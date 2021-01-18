import { createSelector } from "@reduxjs/toolkit";
import { StoreState } from "store";

export const selectShowModal = createSelector(
  (state: StoreState) => ({
    showModal: state.app.showModal,
  }),
  (state) => state
);

export const selectUserInfo = createSelector(
  (state: StoreState) => ({
    userInfo: state.app.userInfo,
  }),
  (state) => state
);

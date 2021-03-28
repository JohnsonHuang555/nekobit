import { createSelector } from "@reduxjs/toolkit";
// import { StoreState } from "store";

export const selectShowModal = createSelector(
  (state: any) => ({
    showModal: state.app.showModal,
  }),
  (state) => state
);

export const selectUserInfo = createSelector(
  (state: any) => ({
    userInfo: state.app.userInfo,
  }),
  (state) => state
);

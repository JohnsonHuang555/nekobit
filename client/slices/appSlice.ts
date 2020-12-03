import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import { User } from "domain/models/User";

export type State = {
  userInfo?: User;
  showModal: boolean;
};

export type CaseReducer = {
  setUserInfo: (state: State, action: PayloadAction<User>) => void;
  setShowModal: (state: State, action: PayloadAction<boolean>) => void;
};

const appSlice = createSlice<State, CaseReducer>({
  name: 'app',
  initialState: {
    showModal: false,
  },
  reducers: {
    setUserInfo: (state: State, action: PayloadAction<User>) => {
      state.userInfo = action.payload;
    },
    setShowModal: (state: State, action: PayloadAction<boolean>) => {
      state.showModal = action.payload;
    }
  },
});

export const {
  setUserInfo,
  setShowModal,
} = appSlice.actions;

export default appSlice.reducer;

import { createSlice, PayloadAction } from "@reduxjs/toolkit";

export type State = {
  showModal: boolean;
};

export type CaseReducer = {
  setShowModal: (state: State, action: PayloadAction<boolean>) => void;
};

const appSlice = createSlice<State, CaseReducer>({
  name: 'app',
  initialState: {
    showModal: false,
  },
  reducers: {
    setShowModal: (state: State, action: PayloadAction<boolean>) => {
      state.showModal = action.payload;
    }
  },
});

export default appSlice.reducer;

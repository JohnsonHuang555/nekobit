import { createSlice } from "@reduxjs/toolkit";

export type State = {
  isSocketConnected: boolean;
}

export type CaseReducer = {
  wsConnected: (state: State) => void;
};

const webSocketSlice = createSlice<State, CaseReducer>({
  name: 'webSocket',
  initialState: {
    isSocketConnected: false,
  },
  reducers: {
    wsConnected: (state: State) => {
      state.isSocketConnected = true;
    },
  }
});

export const {
  wsConnected,
} = webSocketSlice.actions;

export default webSocketSlice.reducer;

import { createSlice } from "@reduxjs/toolkit";

export type State = {
  isSocketConnected: boolean;
}

export type CaseReducer = {
  wsConnected: (state: State) => void;
  wsDisConnected: (state: State) => void;
};

const webSocketSlice = createSlice<State, CaseReducer>({
  name: 'webSocket',
  initialState: {
    isSocketConnected: false,
  },
  reducers: {
    wsConnected: (state: State) => {
      console.log('connected')
      state.isSocketConnected = true;
    },
    wsDisConnected: (state: State) => {
      console.log('disconnected')
      state.isSocketConnected = false;
    }
  }
});

export const {
  wsConnected,
  wsDisConnected,
} = webSocketSlice.actions;

export default webSocketSlice.reducer;

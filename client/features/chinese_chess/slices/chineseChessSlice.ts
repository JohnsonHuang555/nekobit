import { createSlice } from "@reduxjs/toolkit";

export type State = {
}

export type CaseReducer = {};

const chineseChessSlice = createSlice<State, CaseReducer>({
  name: 'chinese_chess',
  initialState: {
  },
  reducers: {},
  extraReducers: {},
});

export default chineseChessSlice.reducer;

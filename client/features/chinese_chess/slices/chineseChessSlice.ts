import { createSlice } from "@reduxjs/toolkit";

export type State = {
  chesses: any;
}

export type CaseReducer = {};

const chineseChessSlice = createSlice<State, CaseReducer>({
  name: 'chinese_chess',
  initialState: {
    chesses: [],
  },
  reducers: {},
  extraReducers: {},
});

export default chineseChessSlice.reducer;

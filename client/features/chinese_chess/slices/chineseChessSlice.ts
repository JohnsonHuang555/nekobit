import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import { ChineseChess } from "../domain/models/ChineseChess";
import { PlayerSide } from "../domain/models/PlayerSide";

export type State = {
  chineseChess: ChineseChess[];
  playerSide: PlayerSide;
}

export type CaseReducer = {
  setGameData: (state: State, action: PayloadAction<State>) => void;
};

const chineseChessSlice = createSlice<State, CaseReducer>({
  name: 'chinese_chess',
  initialState: {
    chineseChess: [],
    playerSide: {},
  },
  reducers: {
    setGameData: (state: State, action: PayloadAction<State>) => {
      state.chineseChess = action.payload.chineseChess;
      state.playerSide = action.payload.playerSide;
    }
  },
  extraReducers: {},
});

export const {
  setGameData,
} = chineseChessSlice.actions;

export default chineseChessSlice.reducer;

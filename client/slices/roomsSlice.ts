import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import { createRoom, loadRooms } from "actions/roomsAction";
import { Player } from "domain/models/Player";
import { Room } from "domain/models/Room";

export type State = {
  rooms: Room[];
  selectedRoom?: Room;
  createdId: string;
  loading: boolean;
  showGameScreen: boolean;
  isReadyToStart: boolean;
  isGameOver: boolean;
  surrenderId: string; // 投降者
};

export type CaseReducer = {
  joinRoom: (state: State, action: PayloadAction<Room>) => void;
  readyGame: (state: State, action: PayloadAction<Player[]>) => void;
  startGame: (state: State, action: PayloadAction<Room>) => void;
  changePlayer: (state: State, action: PayloadAction<string>) => void;
  setShowGameScreen: (state: State, action: PayloadAction<boolean>) => void;
  setIsReadyToStart: (state: State, action: PayloadAction<boolean>) => void;
  setGameOver: (state: State, action: PayloadAction<{
    isGameOver: boolean,
    surrenderId: string,
  }>) => void;
};

const roomsSlice = createSlice<State, CaseReducer>({
  name: 'rooms',
  initialState: {
    rooms: [],
    selectedRoom: undefined,
    createdId: '',
    loading: false,
    showGameScreen: false,
    isReadyToStart: false,
    isGameOver: false,
    surrenderId: '',
  },
  reducers: {
    joinRoom: (state: State, action: PayloadAction<Room>) => {
      if (action.payload.gameData) {
        state.showGameScreen = true;
      }
      state.selectedRoom = action.payload;
    },
    readyGame: (state: State, action: PayloadAction<Player[]>) => {
      if (state.selectedRoom) {
        state.selectedRoom = {
          ...state.selectedRoom,
          playerList: action.payload,
        };
      }
    },
    startGame: (state: State, action: PayloadAction<Room>) => {
      state.selectedRoom = action.payload;
      state.showGameScreen = true;
    },
    changePlayer: (state: State, action: PayloadAction<string>) => {
      if (state.selectedRoom) {
        state.selectedRoom.nowTurn = action.payload;
      }
    },
    setShowGameScreen: (state: State, action: PayloadAction<boolean>) => {
      state.showGameScreen = action.payload;
    },
    setIsReadyToStart: (state: State, action: PayloadAction<boolean>) => {
      state.isReadyToStart = action.payload;
    },
    setGameOver: (state: State, action: PayloadAction<{
      isGameOver: boolean,
      surrenderId: string,
    }>) => {
      state.isGameOver = action.payload.isGameOver;
      state.surrenderId = action.payload.surrenderId;
    },
  },
  extraReducers: {
    [loadRooms.pending.toString()]: (state) => {
      state.loading = true;
    },
    [loadRooms.fulfilled.toString()]: (state, action: PayloadAction<Room[]>) => {
      state.rooms = action.payload;
      state.loading = false;
    },
    [createRoom.pending.toString()]: (state) => {
      state.loading = true;
    },
    [createRoom.fulfilled.toString()]: (state, action: PayloadAction<string>) => {
      state.createdId = action.payload;
      state.loading = false;
    },
  },
});

export const {
  joinRoom,
  readyGame,
  startGame,
  changePlayer,
  setShowGameScreen,
  setIsReadyToStart,
  setGameOver,
} = roomsSlice.actions;

export default roomsSlice.reducer;

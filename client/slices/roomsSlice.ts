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
};

export type CaseReducer = {
  joinRoom: (state: State, action: PayloadAction<Room>) => void;
  readyGame: (state: State, action: PayloadAction<Player[]>) => void;
  startGame: (state: State, action: PayloadAction<Room>) => void;
  changePlayer: (state: State, action: PayloadAction<string>) => void;
  setShowGameScreen: (state: State, action: PayloadAction<boolean>) => void;
};

const roomsSlice = createSlice<State, CaseReducer>({
  name: 'rooms',
  initialState: {
    rooms: [],
    selectedRoom: undefined,
    createdId: '',
    loading: false,
    showGameScreen: false,
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
    }
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
} = roomsSlice.actions;

export default roomsSlice.reducer;

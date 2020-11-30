import { createAsyncThunk } from "@reduxjs/toolkit";
import { getApi, postApi } from "api/Fetcher";
import { RoomFactory } from "domain/factories/RoomFactory";
import { GamePack } from "domain/models/Room";

export const loadRooms = createAsyncThunk(
  'rooms/loadRooms',
  async (_, thunkAPI) => {
    try {
      const response = await getApi('/getRooms');
      return RoomFactory.createArrayFromNet(response.data);
    } catch (error) {
      return thunkAPI.rejectWithValue({ error: error.message })
    }
  }
);

export type CreateRoomParams = {
  title: string;
  password: string;
  game_pack: GamePack;
  mode: string;
}

export const createRoom = createAsyncThunk(
  'rooms/createRoom',
  async (data: CreateRoomParams, thunkAPI) => {
    try {
      const response = await postApi('/createRoom', data);
      // return room id
      return response.data;
    } catch (error) {
      return thunkAPI.rejectWithValue({ error: error.message })
    }
  }
);

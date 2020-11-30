import { createAsyncThunk } from "@reduxjs/toolkit";
import { getApi } from "api/Fetcher";
import { RoomFactory } from "domain/factories/RoomFactory";

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

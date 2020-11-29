import { createAsyncThunk } from "@reduxjs/toolkit";
import { getApi } from "api/Fetcher";
import { GameFactory } from "domain/factories/GameFactory";

export const loadGames = createAsyncThunk(
  'games/loadGames',
  async (_, thunkAPI) => {
    try {
      const response = await getApi('/games');
      return GameFactory.createArrayFromNet(response.data);
    } catch (error) {
      return thunkAPI.rejectWithValue({ error: error.message })
    }
  }
);

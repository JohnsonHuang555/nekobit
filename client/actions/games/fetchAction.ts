import { createAsyncThunk } from "@reduxjs/toolkit";
import { getApi } from "api/Fetcher";

export const loadGames = createAsyncThunk(
  'games/loadGames',
  async (_, thunkAPI) => {
    try {
      const response = await getApi('/games');
      return response.data;
    } catch (error) {
      return thunkAPI.rejectWithValue({ error: error.message })
    }
  }
);

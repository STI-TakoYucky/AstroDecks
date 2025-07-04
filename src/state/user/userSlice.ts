import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import axios from "axios";

export const fetchUser = createAsyncThunk(
  "user/fetchUser",
  async (userData, thunkAPI) => {
    try {
      const { data } = await axios.post("http://localhost:3000/api", userData);
      return data;
    } catch (error: any) {
      return thunkAPI.rejectWithValue(error.message);
    }
  }
);

interface initialStateInterface {
    id: String,
    username: String,
    loading: boolean,
    error: null | String
}

const initialState: initialStateInterface = {
  id: "",
  username: "",
  loading: false,
  error: null as string | null,
};

export const userSlice = createSlice({
  name: "user",
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(fetchUser.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(fetchUser.fulfilled, (state, action) => {
        const data = action.payload;
        state.loading = false;
        state.id = data._id;
        state.username = data.username;
      })
      .addCase(fetchUser.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload as string;
      });
  },
});

export default userSlice.reducer;

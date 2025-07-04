import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import axios from "axios";
import { initDecks } from "../userDecks/userDecksSlice";

export const fetchUser = createAsyncThunk(
  "user/fetchUser",
  async (userData, thunkAPI) => {
    try {

      const { data } = await axios.post("http://localhost:3000/api", userData);

      thunkAPI.dispatch(initDecks(data.decks))

      return data;
    } catch (error: any) {
      return thunkAPI.rejectWithValue(error.response.data);
    }
  }
);

interface initialStateInterface {
    _id: string,
    username: string,
    imageUrl: string,
    loading: boolean,
    error: null | string
}

const initialState: initialStateInterface = {
  _id: "",
  username: "",
  imageUrl: "",
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
        state._id = data._id;
        state.username = data.username;
        state.imageUrl = data.imageUrl
      })
      .addCase(fetchUser.rejected, (state, action) => {
        const data: any = action.payload
        state.loading = false;
        state.error = data.message as string;
      });
  },
});

export default userSlice.reducer;

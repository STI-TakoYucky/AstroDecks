import type { DeckInterface } from "@/types";
import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import axios from "axios";

export const pushDeck = createAsyncThunk(
  'userDecks/pushDeck',
  async (decksData: DeckInterface, thunkAPI) => {
    try {
       const { data } = await axios.post('http://localhost:3000/api/push_deck', decksData)
       return data
    } catch (error: any) {
      return thunkAPI.rejectWithValue(error.response.data)
    }
  }
)

interface UserDecksState {
  decks: DeckInterface[];
  loading: boolean,
  error: null | string
}

const initialState: UserDecksState = {
  decks: [],
  loading: false,
  error: null as string | null,
};

const userDecksSlice = createSlice({
    name: "userDecks",
    initialState,
    reducers:{
      initDecks: (state, action) => {
        state.decks = action.payload
      }
    },
    extraReducers: (builder) => {
      builder
        .addCase(pushDeck.pending, (state) => {
          state.loading = true,
          state.error = null
        })
        .addCase(pushDeck.fulfilled, (state, action) => {
          const data = action.payload;
          state.loading = false;
          state.decks.push(data)
        })
        .addCase(pushDeck.rejected, (state, action) => {
          const data: any = action.payload
          state.loading = false,
          state.error = data.message as string
        })
    }
})

export const { initDecks } = userDecksSlice.actions

export default userDecksSlice.reducer
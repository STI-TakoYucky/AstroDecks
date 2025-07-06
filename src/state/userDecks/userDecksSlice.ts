import type { DeckInterface } from "@/types";
import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import axios from "axios";

export const pushDeck = createAsyncThunk(
  'userDecks/pushDeck',
  async (decksData: DeckInterface, thunkAPI) => {
    try {
       const { data } = await axios.post('http://localhost:3000/api/decks', decksData)
              console.log(data)
       return data
    } catch (error: any) {
      return thunkAPI.rejectWithValue(error.response.data)
    }
  }
)

export const fetchDecks = createAsyncThunk(
  'userDecks/fetchDecks', 
  async (userID: string, thunkAPI) => {
    try {
      //the data is an array
      const { data } = await axios.get(`http://localhost:3000/api/decks/${userID}`)
      return data
    } catch (error: any) {
      return thunkAPI.rejectWithValue(error.response.data)
    }
  }
)

export const renameDeck = createAsyncThunk(
  'userDecks/renameDeck',
  async(deck: {newTitle: string, deck: DeckInterface}, thunkAPI) => {
    try {
      const { data } = await axios.patch(`http://localhost:3000/api/decks/${deck.deck._id}`, {title: deck.newTitle})
      return data;
    } catch (error: any) {
      return thunkAPI.rejectWithValue(error.response.data)
    }
  }
)

export const deleteDeck = createAsyncThunk(
  'userDecks/deleteDeck',
  async (deckID: string, thunkAPI) => {
    try {
      await axios.delete(`http://localhost:3000/api/decks/${deckID}`)
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
    reducers:{},
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

        .addCase(fetchDecks.pending, (state) => {
          state.loading = true,
          state.error = null
        })
        .addCase(fetchDecks.fulfilled, (state, action) => {
          state.loading = false
          state.decks = action.payload
        })
        .addCase(fetchDecks.rejected, (state, action) => {
          const data: any = action.payload
          state.loading = false,
          state.error = data.message as string
        })

        .addCase(renameDeck.pending, (state) => {
          state.loading = true,
          state.error = null
        })
        .addCase(renameDeck.fulfilled, (state, action) => {
          state.loading = false
          const newDeck: DeckInterface[] = state.decks.map((item) => {
            if (item._id == action.payload._id) {
              return {...item, title: action.payload.title}
            } else {
              return item
            }
          })
          
          state.decks = newDeck
        })
        .addCase(renameDeck.rejected, (state, action) => {
          const data: any = action.payload
          state.loading = false,
          state.error = data.message as string
        })

        .addCase(deleteDeck.pending, (state) => {
          state.loading = true,
          state.error = null
        })
        .addCase(deleteDeck.fulfilled, (state, action) => {
          state.loading = false;
          state.decks = state.decks.filter(item => item._id !== action.payload);
        })
        .addCase(deleteDeck.rejected, (state, action) => {
          const data: any = action.payload
          state.loading = false,
          state.error = data.message as string
        })
    }
})

// export const { deleteDeckReducer } = userDecksSlice.actions

export default userDecksSlice.reducer
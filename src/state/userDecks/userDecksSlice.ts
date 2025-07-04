import type { DeckInterface } from "@/types";
import { createSlice } from "@reduxjs/toolkit";

interface UserDecksState {
  decks: DeckInterface[];
}

const initialState: UserDecksState = {
  decks: []
};

const userDecksSlice = createSlice({
    name: "userDecks",
    initialState,
    reducers:{
        addDecks: (state, action) => {
            state.decks.push(action.payload)
        }
    }
})

export const { addDecks } = userDecksSlice.actions

export default userDecksSlice.reducer
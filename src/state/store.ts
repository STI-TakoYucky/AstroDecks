import { configureStore } from '@reduxjs/toolkit'
import userReducer from '../state/user/userSlice'
import userDecksReducer from '../state/userDecks/userDecksSlice'

export const store = configureStore({
  reducer: {
    user: userReducer,
    userDecks: userDecksReducer
  }
})

// Infer the `RootState`,  `AppDispatch`, and `AppStore` types from the store itself
export type RootState = ReturnType<typeof store.getState>
// Inferred type: {posts: PostsState, comments: CommentsState, users: UsersState}
export type AppDispatch = typeof store.dispatch
export type AppStore = typeof store
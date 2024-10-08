import { configureStore } from "@reduxjs/toolkit";
import AuthReducer from "./reducers/auth"
import ChatReducer from "./reducers/chats"
import FriendsReducer from "./reducers/Friends"
import api from "./api/api";
import { combineReducers } from '@reduxjs/toolkit';

const rootReducer = combineReducers({
  auth: AuthReducer,
  chats: ChatReducer,
  friends : FriendsReducer,
  api: api.reducer,
});

export const store = configureStore({
  reducer: rootReducer,
  middleware: (getDefaultMiddleware) => getDefaultMiddleware().concat(api.middleware),
});
export type RootState = ReturnType<typeof store.getState>
export type AppDispatch = typeof store.dispatch
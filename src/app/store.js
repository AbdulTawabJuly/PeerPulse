import { combineReducers, configureStore } from "@reduxjs/toolkit";
import authReducer from "../features/auth/authSlice";
import roomReducer from "../features/rooms/RoomSlice"
import storage from 'redux-persist/lib/storage'
import {persistReducer} from 'redux-persist'
import messagesReducer from "../features/chat/ChatSlice"

const persistConfig = {
  key:"root",
  version:1,
  storage
};

const reducer = combineReducers({
  auth:authReducer,
  room:roomReducer,
  messages: messagesReducer
})

const persistedReducer = persistReducer(persistConfig, reducer);

export const store = configureStore({
  reducer: persistedReducer
});

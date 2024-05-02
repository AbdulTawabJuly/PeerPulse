import { combineReducers, configureStore } from "@reduxjs/toolkit";
import authReducer from "../features/auth/authSlice";
import roomReducer from "../features/rooms/RoomSlice"
import friendReducer from "../features/friends/friendSlice"
import storage from 'redux-persist/lib/storage'
import {persistReducer} from 'redux-persist'
import messagesReducer from "../features/chat/ChatSlice"
import whiteboardReducer from "../features/whiteboard/whiteboardSlice"
import gptReducer from "../features/GPT/GPTSlice"
import videoReducer from "../features/VideoCall/videoCallSlice"
import moderatorReducer from "../features/Moderator/ModeratorSlice"

const persistConfig = {
  key:"root",
  version:1,
  storage
};

const reducer = combineReducers({
  auth:authReducer,
  room:roomReducer,
  messages: messagesReducer,
  video:videoReducer,
  gpt: gptReducer,
  friend: friendReducer,
  moderator:moderatorReducer,
  whiteboard:whiteboardReducer
})

const persistedReducer = persistReducer(persistConfig, reducer);

export const store = configureStore({
  reducer: persistedReducer
});

// messagesSlice.js
import { createSlice } from '@reduxjs/toolkit';

const messagesSlice = createSlice({
  name: 'messages',
  initialState: {
    messages: [],
  },
  reducers: {
    sendMessage: (state, action) => {
      state.messages.push(action.payload);
    },
    emptyMessages:(state) => {
        state.messages = [];
    }
  },
});

export const { sendMessage, emptyMessages } = messagesSlice.actions;
export const selectMessages = (state) => state.messages.messages;

export default messagesSlice.reducer;

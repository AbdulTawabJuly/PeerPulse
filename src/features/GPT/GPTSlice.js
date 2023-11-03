// messagesSlice.js
import { createSlice } from '@reduxjs/toolkit';

const gptSlice = createSlice({
  name: 'gpt',
  initialState: {
    gpt: [],
  },
  reducers: {
    sendgptMessage: (state, action) => {
      state.gpt.push(action.payload);
    },
    emptygptMessages:(state) => {
        state.gpt = [];
    }
  },
});

export const { sendgptMessage, emptygptMessages } = gptSlice.actions;
export const selectGPTMessages = (state) => state.gpt.gpt;

export default gptSlice.reducer;

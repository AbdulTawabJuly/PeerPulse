import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import {
    sendReq,
  } from "./friendApi.js";

const initialState = {
  friends: [],
  blocked: [],
  status:"idle",
  error:null,
};

export const sendReqAsync = createAsyncThunk(
    "friend/sendReq",
    async (data) => {
      try {
        const response = await sendReq(data);
        // The value we return becomes the `fulfilled` action payload
        return response.data;
      } catch (error) {
        throw error;
      }
    }
  );

const friendSlice = createSlice({
  name: 'friend',
  initialState,
  reducers: {
    addFriend: (state, action) => {
      state.friends.push(action.payload);
    },
    removeFriend: (state, action) => {
      state.friends = state.friends.filter((friend) => friend !== action.payload);
    },
    blockFriend: (state, action) => {
      const friendToBlock = action.payload;
      state.blocked.push(friendToBlock);
      state.friends = state.friends.filter((friend) => friend !== friendToBlock);
    },
    setErrorToNull: (state) => {
      state.error = null;
    },
    setLoadingToNull: (state) => {
      state.status = "idle";
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(sendReqAsync.pending, (state) => {
        state.status = "loading";
      })
      .addCase(sendReqAsync.fulfilled, (state,action) => {
        state.status = "fulfilled"
        state.error = null
        console.log('state.error after fulfilled: ',action.payload.message);
      })
      .addCase(sendReqAsync.rejected, (state,action) => {
        state.status = "error";
        state.error = action.error.message;
        console.log('state.error after rejected: ',state.error);
      })
  },
});

export const selectErrors = (state) => state.friend.error;
export const selectStatus = (state) => state.friend.status;
export const { addFriend, removeFriend, blockFriend, setErrorToNull, setLoadingToNull } = friendSlice.actions;

export default friendSlice.reducer;

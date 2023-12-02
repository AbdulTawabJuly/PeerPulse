import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import {
    sendReq,
    addFriend,
    declineReq,
    removeFriend,
    blockFriend
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

  export const addFriendAsync = createAsyncThunk(
    "friend/addFriend",
    async(data) => {
      try {
        const response = await addFriend(data);
        return response.data;
      }
      catch(error) {
        throw error;
      }
    }
  )

  export const declineReqAsync = createAsyncThunk(
    "friend/declineReq",
    async(data) => {
      try {
        const response = await declineReq(data);
        return response.data;
      }
      catch(error) {
        throw error
      }
    }
  )

  export const removeFriendAsync = createAsyncThunk(
    "friend/removeFriend",
    async(data) => {
      try {
        const response = await removeFriend(data);
        return response.data;
      }
      catch(error) {
        throw error
      }
    }
  )

  export const blockFriendAsync = createAsyncThunk(
    "friend/blockFriend",
    async(data) => {
      try {
        const response = await blockFriend(data)
        return response.data
      }
      catch(error) {
        throw error
      }
    }
  )

const friendSlice = createSlice({
  name: 'friend',
  initialState,
  reducers: {
   setErrorToNull:(state)=> {
    state.error = null
   },
   setLoadingToNull: (state)=> {
    state.status = null
   },
   setFriends: (state, action) => {
    state.friends = action.payload.friends
   }
  },
  extraReducers: (builder) => {
    builder
      .addCase(sendReqAsync.pending, (state) => {
        state.status = "loading";
      })
      .addCase(sendReqAsync.fulfilled, (state,action) => {
        state.status = "fulfilled"
        state.error = action.payload.message;
      })
      .addCase(sendReqAsync.rejected, (state,action) => {
        state.status = "error";
        state.error = action.error.message;
      })
      .addCase(addFriendAsync.pending, (state) => {
        state.status = "loading";
      })
      .addCase(addFriendAsync.fulfilled, (state,action) => {
        state.status = "fulfilled"
        state.error = action.payload.message;
      })
      .addCase(addFriendAsync.rejected, (state,action) => {
        state.status = "error";
        state.error = action.error.message;
      })
      .addCase(declineReqAsync.pending, (state) => {
        state.status = "loading";
      })
      .addCase(declineReqAsync.fulfilled, (state,action) => {
        state.status = "fulfilled"
        state.error = action.payload.message;
      })
      .addCase(declineReqAsync.rejected, (state,action) => {
        state.status = "error";
        state.error = action.error.message;
      })
      .addCase(removeFriendAsync.pending, (state) => {
         state.status = "loading"
       })
      .addCase(removeFriendAsync.fulfilled, (state, action) => {
        state.status = "fulfilled"
        state.error = action.payload.message
      })
      .addCase(removeFriendAsync.rejected, (state, action )=> {
        state.status = "error"
        state.error = action.error.message
      })
      .addCase(blockFriendAsync.pending, (state) => {
        state.status = "loading"
      })
     .addCase(blockFriendAsync.fulfilled, (state, action) => {
       state.status = "fulfilled"
       state.error = action.payload.message
     })
     .addCase(blockFriendAsync.rejected, (state, action )=> {
       state.status = "error"
       state.error = action.error.message
     })
      
  },
});

export const selectErrors = (state) => state.friend.error;
export const selectStatus = (state) => state.friend.status;
export const selectFriends = (state) => state.friend.friends;
export const { setErrorToNull, setLoadingToNull, setFriends } = friendSlice.actions;

export default friendSlice.reducer;

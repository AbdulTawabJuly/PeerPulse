import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import { checkUser, createUser } from "./authApi";

const initialState = {
  loggedInUser: null,
  status: "idle",
  error: null,
};

export const createUserAsync = createAsyncThunk(
  "user/createUser",
  async (userData) => {
    try {
      const response = await createUser(userData);
      // The value we return becomes the `fulfilled` action payload
      return response.data;
    }
    catch (error) {
      throw error;
    }
    
  }
);

export const checkUserAsync = createAsyncThunk(
  "user/checkUser",
  async (loginInfo) => {
    try {
      const response = await checkUser(loginInfo);
      return response.data;
    }
    catch (error) {
      throw error;
    }
  }
);



export const authSlice = createSlice({
  name: "user",
  initialState,
  reducers: {
    signOut: (state) => {
      state.loggedInUser = null;
    }
  },
  extraReducers: (builder) => {
    builder
      .addCase(createUserAsync.pending, (state) => {
        state.status = "loading";
      })
      .addCase(createUserAsync.fulfilled, (state, action) => {
        state.status = "idle";
        state.loggedInUser = action.payload;
      })
      .addCase(createUserAsync.rejected, (state, action) => {
        state.status = "idle";
        state.error = action.error.message;
      })
      .addCase(checkUserAsync.pending, (state) => {
        state.status = "loading";
      })
      .addCase(checkUserAsync.fulfilled, (state, action) => {
        state.status = "idle";
        state.loggedInUser = action.payload;
      })
      .addCase(checkUserAsync.rejected, (state, action) => {
        state.status = "idle";
        state.error = action.error.message;
      });
  },
});

export const selectLoggedInUser = (state) => state.auth.loggedInUser;
export const selectErrors = (state) => state.auth.error;
export const selectStatus = (state) => state.auth.status;
export const {signOut} = authSlice.actions;
export default authSlice.reducer;

import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import {
  checkUser,
  createUser,
  resetPassword,
  resetPasswordRequest,
  GetUser,
  updateUserInfo
} from "./authApi";

const initialState = {
  loggedInUser: null,
  status: "idle",
  error: null,
  mailSent: false,
  passwordReset: false,
  notifications: [],
  getuser:null,
};

export const createUserAsync = createAsyncThunk(
  "user/createUser",
  async (userData) => {
    try {
      const response = await createUser(userData);
      // The value we return becomes the `fulfilled` action payload
      return response.data;
    } catch (error) {
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
    } catch (error) {
      throw error;
    }
  }
);

export const resetPasswordRequestAsync = createAsyncThunk(
  "user/resetPasswordRequest",
  async (email) => {
    try {
      const response = await resetPasswordRequest(email);
      return response.data;
    } catch (error) {
      throw error;
    }
  }
);

export const resetPasswordAsync = createAsyncThunk(
  "user/resetPassword",
  async (data) => {
    try {
      const response = await resetPassword(data);
      return response.data;
    } catch (error) {
      throw error;
    }
  }
);

export const getUser=createAsyncThunk(
  "user/getUser",
  async(data)=>{
    try{
      const response=await GetUser(data);
      return response;
    }catch(error){
      throw error;
    }
  }
)
export const UpdateUserInfo=createAsyncThunk(
  "user/updateUser",
  async(data)=>{
    try{
      const response=await updateUserInfo(data);
      return response;
    }catch(error){
      throw error;
    }
  }
)

export const authSlice = createSlice({
  name: "user",
  initialState,
  reducers: {
    signOut: (state) => {
      state.loggedInUser = null;
    },
    setMailSentToFalse: (state) => {
      state.mailSent = false;
    },
    setPasswordResetToFalse: (state) => {
      state.passwordReset = false;
    },
    setErrorToNull: (state) => {
      state.error = null;
    },
    setNotifications: (state, action) => {
      state.notifications = action.payload
      console.log('state.notificatins',state.notifications);
    }
  },
  extraReducers: (builder) => {
    builder
      .addCase(createUserAsync.pending, (state) => {
        state.status = "loading";
        state.error=null;
      })
      .addCase(createUserAsync.fulfilled, (state, action) => {
        state.status = "idle";
        state.loggedInUser = action.payload;
        state.error=null;

      })
      .addCase(createUserAsync.rejected, (state, action) => {
        state.status = "idle";
        state.error = action.error.message;
      })
      .addCase(checkUserAsync.pending, (state) => {
        state.status = "loading";
        state.error=null;

      })
      .addCase(checkUserAsync.fulfilled, (state, action) => {
        state.status = "idle";
        state.loggedInUser = action.payload;
        state.error=null;

      })
      .addCase(checkUserAsync.rejected, (state, action) => {
        state.status = "idle";
        state.error = action.error.message;
      })
      .addCase(resetPasswordRequestAsync.pending, (state, action) => {
        state.status = "loading";
        state.error=null;

      })
      .addCase(resetPasswordRequestAsync.fulfilled, (state, action) => {
        state.status = "idle";
        state.mailSent = true;
        state.error=null;

      })
      .addCase(resetPasswordAsync.pending, (state, action) => {
        state.status = "loading";
        state.error=null;

      })
      .addCase(resetPasswordAsync.fulfilled, (state, action) => {
        state.status = "idle";
        state.passwordReset = true;
        state.error=null;

      })
      .addCase(resetPasswordAsync.rejected, (state, action) => {
        state.status = "idle";
        state.error = action.error.message;

      })
      .addCase(getUser.pending, (state, action) => {
        state.status = "loading";
        state.getuser=null;
        state.error=null;

      })
      .addCase(getUser.fulfilled, (state, action) => {
        state.status = "fulfilled";
        state.getuser = action.payload;
        state.error=null;

      })
      .addCase(getUser.rejected, (state, action) => {
        state.status = "error";
        state.getuser=null;
        state.error = action.error;
      })
      .addCase(UpdateUserInfo.pending, (state, action) => {
        state.status = "loading";
        state.error=null;

      })
      .addCase(UpdateUserInfo.fulfilled, (state, action) => {
        state.status = "fulfilled";
        state.error=null;
      })
      .addCase(UpdateUserInfo.rejected, (state, action) => {
        state.status = "error";
        state.error = action.error;
      });
  },
})

export const selectLoggedInUser = (state) => state.auth.loggedInUser;
export const selectErrors = (state) => state.auth.error;
export const selectStatus = (state) => state.auth.status;
export const selectNotifications = (state) => state.auth.notifications;
export const selectMailSent = (state) => state.auth.mailSent;
export const selectPasswordReset = (state) => state.auth.passwordReset;
export const selectGetUser=(state)=>state.auth.getuser;

export const {
  signOut,
  setMailSentToFalse,
  setPasswordResetToFalse,
  setErrorToNull,
  setNotifications
} = authSlice.actions;
export default authSlice.reducer;

// messagesSlice.js
import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import { Makemoderator,Removemoderator } from "./ModeratorAPI";
export const MakeModerator=createAsyncThunk("room/makemoderator",async(RoomDetails)=>{
    try{
        const response=await Makemoderator(RoomDetails);
        return response;
    }
    catch(error){
      throw error;
    }
  })
  export const RemoveModerator=createAsyncThunk("room/removemoderator",async(RoomDetails)=>{
    try{
        const response=await Removemoderator(RoomDetails);
        return response;
    }
    catch(error){
      throw error;
    }
  })
const ModeratorSlice = createSlice({
  name: "moderator",
  initialState: {
    status: "",
    error:null,
  },
  reducers: {
   
  },
  extraReducers: (someShit) => {
    someShit
      .addCase(MakeModerator.pending, (state) => {
        state.status = "loading";
        state.error = null;
        
      })
      .addCase(MakeModerator.fulfilled, (state, action) => {
        state.status = "fulfilled";
        state.error=null;
      })
      .addCase(MakeModerator.rejected, (state, action) => {
        state.status = "error";
        state.error = action.error.message;
      })
      .addCase(RemoveModerator.pending, (state) => {
        state.status = "loading";
        state.error = null;
        
      })
      .addCase(RemoveModerator.fulfilled, (state, action) => {
        state.status = "fulfilled";
        state.error=null;
      })
      .addCase(RemoveModerator.rejected, (state, action) => {
        state.status = "error";
        state.error = action.error.message;
      })
      
  },
});
export const selectModError = (state) => state.moderator.error;
export const selectModStatus = (state) => state.moderator.status;

export default ModeratorSlice.reducer;

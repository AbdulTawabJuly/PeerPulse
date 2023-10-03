import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import { searchRooms } from "./RoomAPICalls";
import { CreateRoom } from "./RoomAPICalls";
import { Leaveroom,Joinroom } from "./RoomAPICalls";
import { redirect } from "react-router-dom";
const initialState = {
  searchedRooms: null,
  joinedRoom: null,
  status: "",
  error: null,
};
export const searchRoom = createAsyncThunk(
  "room/search",
  async (searchedItem) => {
    try {
      const response = await searchRooms(searchedItem);
      return response;
    } catch (error) {
      throw error;
    }
  }
);
export const createRoom = createAsyncThunk(
  "room/create",
  async (RoomDetails) => {
    try {
      const response = await CreateRoom(RoomDetails);
      return response;
    } catch (error) {
      throw error;
    }
  }
);
export const JoinRoom = createAsyncThunk(
  "room/JoinRoom",
  async (RoomDetails) => {
    try {
      console.log('Im in slice');
      const response = await Joinroom(RoomDetails);
      return response.data;
    } catch (error) {

      throw error;
    }
  }
);
export const LeaveRoom = createAsyncThunk(
    "room/leave",
    async (RoomDetails) => {
      try {
        const response = await Leaveroom(RoomDetails);
        return response;
      } catch (error) {

        throw error;
      }
    }
  );

export const roomSlice = createSlice({
  name: "room",
  initialState,
  reducers: {},
  extraReducers: (someShit) => {
    someShit 
      .addCase(searchRoom.pending, (state) => {
        state.status = "loading";
      })
      .addCase(searchRoom.fulfilled, (state, action) => {
        state.status = "idle";
        state.searchedRooms = action.payload;
      })
      .addCase(searchRoom.rejected, (state, action) => {
        state.status = "idle";
        state.error = action.error.message;
      })
      .addCase(createRoom.pending, (state) => {
        state.status = "loading";
        state.error = null;
      })

      .addCase(createRoom.fulfilled, (state, action) => {
        state.status = "idle";
        state.joinedRoom = action.payload;
        state.error = null;
      })
      .addCase(createRoom.rejected, (state, action) => {
        state.status = "idle";
        state.error = action.error;
      })
     
      .addCase(LeaveRoom.pending, (state) => {
        state.status = "loading";
        state.error = null;
      })
      .addCase(LeaveRoom.fulfilled, (state, action) => {
        state.status = "idle";
        state.joinedRoom = null;
        state.error = null;
      })
      .addCase(LeaveRoom.rejected, (state, action) => {
        state.status = "idle";
        state.error = action.error;
      })
      .addCase(JoinRoom.pending, (state) => {
        state.status = "loading";
        state.error = null;
      })
      .addCase(JoinRoom.fulfilled, (state, action) => {
        state.status = "EnterRoomNow";
        state.joinedRoom = action.payload;
        state.error = null;
      })
      .addCase(JoinRoom.rejected, (state, action) => {
        state.status = "idle";
        state.joinedRoom=null;
        state.error = action.error;
      })
  },
});
export const selectSearchedRooms = (state) => state.room.searchedRooms;
export const selectRoomError = (state) => state.room.error;
export const selectJoinedRoom = (state) => state.room.joinedRoom;
export const selectStatus=(state)=>state.room.status;
export default roomSlice.reducer;

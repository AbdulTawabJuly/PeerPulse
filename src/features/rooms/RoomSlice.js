import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import { searchRooms, sendInvoice } from "./RoomAPICalls";
import { CreateRoom } from "./RoomAPICalls";
import { Leaveroom, Joinroom, Getroom, getToken } from "./RoomAPICalls";
import { redirect } from "react-router-dom";
const initialState = {
  searchedRooms: null,
  joinedRoom: null,
  messages: null,
  status: "",
  error: null,
  currentlyClickedRoom: null,
  token:null,
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

export const sendInvoiceAsync = createAsyncThunk(
  "room/sendInvoice",
  async ({ RoomDetails, user, params }) => {
    try {
      const response = await sendInvoice({ RoomDetails, user, params });
      return response;
    } catch (error) {
      throw error;
    }
  }
);

export const getTokenAsync = createAsyncThunk("room/getToken", async () => {
  try {
    const response = await getToken();
    const data = response.data;
    return data;
  } catch (error) {
    throw error;
  }
});

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
      const response = await Joinroom(RoomDetails);
      return response.data;
    } catch (error) {
      throw error;
    }
  }
);
export const LeaveRoom = createAsyncThunk("room/leave", async (RoomDetails) => {
  try {
    const response = await Leaveroom(RoomDetails);
    return response;
  } catch (error) {
    throw error;
  }
});

// export const getRoom = createAsyncThunk(
//   "room/get",
//   async (RoomDetails) => {
//     try {
//       const response = await getRoom(RoomDetails);
//       return response.data;
//     }
//     catch (error) {
//       throw error;
//     }
//   }
// )

export function GetJoinedRoom() {
  return initialState.joinedRoom;
}

// export function setCurrentlyClicked( val) {
//   currentlyClickedRoom = val;
// }

export const roomSlice = createSlice({
  name: "room",
  initialState,
  reducers: {
    setCurrentlyClickedPaidRoom: (state, action) => {
      state.currentlyClickedRoom = action.payload;
    },
  },
  extraReducers: (someShit) => {
    someShit
      .addCase(searchRoom.pending, (state) => {
        state.status = "loading";
      })
      .addCase(searchRoom.fulfilled, (state, action) => {
        state.status = "fulfilled";
        state.searchedRooms = action.payload;
      })
      .addCase(searchRoom.rejected, (state, action) => {
        state.status = "error";
        state.error = action.error.message;
      })
      .addCase(createRoom.pending, (state) => {
        state.status = "loading";
        state.error = null;
      })

      .addCase(createRoom.fulfilled, (state, action) => {
        state.status = "fulfilled";
        state.joinedRoom = action.payload;
        state.error = null;
      })
      .addCase(createRoom.rejected, (state, action) => {
        state.status = "error";
        state.error = action.error;
      })

      .addCase(LeaveRoom.pending, (state) => {
        state.status = "loading";
        state.error = null;
      })
      .addCase(LeaveRoom.fulfilled, (state, action) => {
        state.status = "fulfilled";
        state.joinedRoom = null;
        state.error = null;
      })
      .addCase(LeaveRoom.rejected, (state, action) => {
        state.status = "error";
        state.error = action.error;
      })
      .addCase(JoinRoom.pending, (state) => {
        state.status = "loading";
        state.error = null;
      })
      .addCase(JoinRoom.fulfilled, (state, action) => {
        state.status = "fulfilled";
        state.joinedRoom = action.payload;
        state.error = null;
      })
      .addCase(JoinRoom.rejected, (state, action) => {
        state.status = "error";
        state.joinedRoom = null;
        state.error = action.error;
      })
      .addCase(getTokenAsync.pending, (state) => {
        state.status = "loading";
        state.token = null;
      })
      .addCase(getTokenAsync.fulfilled, (state, action) => {
        state.status = "fulfilled";
        state.token = action.payload;
        state.error = null;
      })
      .addCase(getTokenAsync.rejected, (state, action) => {
        state.status = "error";
        state.token = null;
        state.error = action.error;
      })
    // .addCase(getRoom.pending, (state,action)=> {
    //   state.status = "loading";
    //   state.error = null;
    // })
    // .addCase(getRoom.fulfilled, (state,action )=> {
    //   state.status = "fulfilled";
    //   state.joinedRoom = action.paylaod;
    //   state.error = null;
    // })
    // .addCase(getRoom.rejected, (state,action) => {
    //   state.status = "rejected";
    //   state.error = action.error;
    // })
  },
});

export const { setCurrentlyClickedPaidRoom } = roomSlice.actions;
export const selectSearchedRooms = (state) => state.room.searchedRooms;
export const selectRoomError = (state) => state.room.error;
export const selectJoinedRoom = (state) => state.room.joinedRoom;
export const selectStatus = (state) => state.room.status;
export const selectCurrentlyClickedRoom = (state) =>
  state.room.currentlyClickedRoom;
export const selectToken =(state)=> state.room.token

export default roomSlice.reducer;

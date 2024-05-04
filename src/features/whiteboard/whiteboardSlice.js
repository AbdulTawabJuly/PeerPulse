import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';

// Import your API functions for adding and removing members
import { addMember, removeMember, getMembers } from './whiteboardApi';

const initialState = {
  members: [],
  status: 'idle',
  error: null,
};

// Define async thunks for adding and removing members
export const addMemberAsync = createAsyncThunk(
  'whiteboard/addMember',
  async (memberData) => {
    try {

      const response = await addMember(memberData);
      return response.data;

    } catch (error) {
      throw error;
    }
  }
);

export const removeMemberAsync = createAsyncThunk(
  'whiteboard/removeMember',
  async (data) => {
    try {
      console.log("in remove member async thunk ...........................................................")
      const response = await removeMember(data);
      console.log("response.data: ", response.data)
      return response.data;

    } catch (error) {
      throw error;
    }
  }
);

export const getMemberAsync = createAsyncThunk(
  'whiteboard/getMember',
  async (data) => {
    try {

      const response = await getMembers(data);
      return response.data;

    } catch (error) {
      throw error;
    }
  }
);

const whiteboardSlice = createSlice({
  name: 'whiteboard',
  initialState,
  reducers: {
    setMembers(state, action) {
      state.members = action.payload.members;
    },
    setErrorToNull(state) {
      state.error = null;
    },
    setLoadingToNull(state) {
      state.status = null;
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(addMemberAsync.pending, (state) => {
        state.status = 'loading';
      })
      .addCase(addMemberAsync.fulfilled, (state, action) => {
        state.status = 'fulfilled';
        // Update members array with the added member
        state.members.push(action.payload);
      })
      .addCase(addMemberAsync.rejected, (state, action) => {
        state.status = 'error';
        state.error = action.error.message;
      })
      .addCase(removeMemberAsync.pending, (state) => {
        state.status = 'loading';
      })
      .addCase(removeMemberAsync.fulfilled, (state, action) => {
        state.status = 'fulfilled';
        // Update members array by removing the specified member
        state.members = state.members.filter(member => member.userId !== action.payload.userId);
      })
      .addCase(removeMemberAsync.rejected, (state, action) => {
        state.status = 'error';
        state.error = action.error.message;
      })
      .addCase(getMemberAsync.pending, (state) => {
        state.status = 'loading';
      })
      .addCase(getMemberAsync.fulfilled, (state, action) => {
        state.status = 'fulfilled';
        state.members = action.payload;
      })
      .addCase(getMemberAsync.rejected, (state, action) => {
        state.status = 'error';
        state.error = action.error.message;
      })

  },
});

export const selectMembers = (state) => state.whiteboard.members;
export const selectStatus = (state) => state.whiteboard.status;
export const selectError = (state) => state.whiteboard.error;
export const { setMembers, setErrorToNull, setLoadingToNull } = whiteboardSlice.actions;

export default whiteboardSlice.reducer;

import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';

// Import your API functions for adding and removing members
import { addMember, removeMember } from './whiteboardApi';

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
      // Call your API function to add a member
      // const response = await addMember(memberData);
      // For demonstration purposes, assume successful response with updated member list
      const response = { data: memberData };
      return response.data;
    } catch (error) {
      throw error;
    }
  }
);

export const removeMemberAsync = createAsyncThunk(
  'whiteboard/removeMember',
  async (memberId) => {
    try {
      // Call your API function to remove a member
      // const response = await removeMember(memberId);
      // For demonstration purposes, assume successful response with updated member list
      const response = { data: memberId };
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
        state.members = state.members.filter(member => member.id !== action.payload);
      })
      .addCase(removeMemberAsync.rejected, (state, action) => {
        state.status = 'error';
        state.error = action.error.message;
      });
  },
});

export const selectMembers = (state) => state.whiteboard.members;
export const selectStatus = (state) => state.whiteboard.status;
export const selectError = (state) => state.whiteboard.error;
export const { setMembers, setErrorToNull, setLoadingToNull } = whiteboardSlice.actions;

export default whiteboardSlice.reducer;

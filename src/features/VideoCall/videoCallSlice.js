// messagesSlice.js
import { createSlice } from "@reduxjs/toolkit";

const videoCallSlice = createSlice({
  name: "video",
  initialState: {
    cameraState: true,
    micState: true,
    currentlyJoined: false,
  },
  reducers: {
    toggleCamera: (state, action) => {
      // if (state.cameraState === true) {
      //   state.cameraState = false;
      // } else {
      //   state.cameraState = true;
      // }
      state.cameraState=!state.cameraState
    },
    toggleMic: (state, action) => {
      // if (state.micState === true) {
      //   state.micState = false;
      // } else {
      //   state.micState = true;
      // }
      state.micState=!state.micState
    },
    JoinStream: (state, action) => {
      state.currentlyJoined = true;
      state.micState=true;
      state.cameraState=true;
    },
    LeaveStream: (state, action) => {
      state.currentlyJoined = false;
      state.cameraState=false;
      state.micState=false;
    },
  },
});

export const { toggleCamera, toggleMic, JoinStream, LeaveStream } =
  videoCallSlice.actions;
export const selectCameraState = (state) => state.video.cameraState;
export const selectMicState = (state) => state.video.micState;
export const selectCurrentlyJoined = (state) => state.video.currentlyJoined;
export default videoCallSlice.reducer;

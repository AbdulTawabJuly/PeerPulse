// messagesSlice.js
import { createSlice } from "@reduxjs/toolkit";

const videoCallSlice = createSlice({
  name: "video",
  initialState: {
    camera: false,
    mic: false,
    joined: false,
  },
  reducers: {
    toggleCamera: (state, action) => {
      if (state.camera === true) {
        state.camera = false;
      } else {
        state.camera = true;
      }
    },
    toggleMic: (state, action) => {
      if (state.mic === true) {
        state.mic = false;
      } else {
        state.mic = true;
      }
    },
    JoinStream: (state, action) => {
      state.joined = true;
      state.mic=true;
      state.camera=true;
    },
    LeaveStream: (state, action) => {
      state.joined = false;
      state.camera=false;
      state.mic=false;
    },
  },
});

export const { toggleCamera, toggleMic, JoinStream, LeaveStream } =
  videoCallSlice.actions;
export const selectCameraState = (state) => state.video.camera;
export const selectMicState = (state) => state.video.mic;
export const selectJoinedPeople = (state) => state.video.joined;
export default videoCallSlice.reducer;

// messagesSlice.js
import { createSlice } from "@reduxjs/toolkit";

const videoCallSlice = createSlice({
  name: "video",
  initialState: {
    cameraState: true,
    micState: true,
    client:null,
    tracks:null,
  },
  reducers: {
    toggleCamera: (state, action) => {
      state.cameraState=!state.cameraState;
    },
    toggleMic: (state, action) => {
      state.micState=!state.micState;
    },
    SetCameraState:(state,action)=>{
      state.cameraState=action.payload;
    },
    SetMicState:(state,action)=>{
      state.micState=action.payload;
    },
    SetClient:(state,action)=>{
        state.client=action.payload;
    },
    SetTracks:(state,action)=>{
      state.tracks=action.payload;
    }
  },
});

export const { toggleCamera, toggleMic,SetClient,SetTracks,SetCameraState,SetMicState} =videoCallSlice.actions;
export const selectCameraState = (state) => state.video.cameraState;
export const selectMicState = (state) => state.video.micState;
export const selectClient=(state)=>state.video.client;
export const selectTracks=(state)=>state.video.tracks;
export default videoCallSlice.reducer;

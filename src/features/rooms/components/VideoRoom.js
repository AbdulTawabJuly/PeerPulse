import React, { useEffect, useState } from "react";
import { useSelector } from "react-redux";
import AgoraRTC from "agora-rtc-sdk-ng";
import VideoPlayer from "./VideoPlayer";
import {
  selectCameraState,
  selectJoinedPeople,
  selectMicState,
} from "../../VideoCall/videoCallSlice";

const APP_ID = "2a6ac8d6740d4c80a8142151c08678ba";
const TOKEN =
  "007eJxTYNg8IWl6SHbl4qBf94oPz13Z9O5k3zaflzKiZx5HnpVLPWmswGCUaJaYbJFiZm5ikGKSbGGQaGFoYmRoaphsYGFmbpGUyHZBI7UhkJGBa74NKyMDBIL4zAwBAUYMDADCaB9W";
const CHANNEL = "PP2";

const client = AgoraRTC.createClient({
  mode: "rtc",
  codec: "vp8",
});

function VideoRoom() {
  //const [localTracks, setLocalTracks] = useState([]);
  // const [remoteUsers, setRemoteUsers] = useState([]);
  let localTracks = [];
  let remoteUsers = [];
  const [backgroundColor,setBackGroundColor] = useState();

  const currentVideo = useSelector(selectCameraState);
  const currentMic = useSelector(selectMicState);
  const joinedPeople = useSelector(selectJoinedPeople);

  const joinAndDisplayLocalStream = async () => {
    client.on('user-published', handleUserJoined)
    
    client.on('user-left', handleUserLeft)
    
    let UID = await client.join(APP_ID, CHANNEL, TOKEN, null)

    localTracks = await AgoraRTC.createMicrophoneAndCameraTracks() // this method will prompt the user to hold their audio and video

    let player = `<div class="video-container" id="user-container-${UID}">
                        <div class="video-player" id="user-${UID}"></div>
                  </div>`
    document.getElementById('video-streams').insertAdjacentHTML('beforeend', player)

    localTracks[1].play(`user-${UID}`) // play creates a video element
    // audio at index 0 and video at index 1
    await client.publish([localTracks[0], localTracks[1]])
  };
  let joinStream = async () => {
    await joinAndDisplayLocalStream()
}

  let handleUserJoined = async (user, mediaType) => {
    remoteUsers[user.uid] = user 
    await client.subscribe(user, mediaType)

    if (mediaType === 'video'){
        let player = document.getElementById(`user-container-${user.uid}`) // this will create a new video player and publish it
        if (player != null){
            player.remove() // this will remove the duplicates if it is already present
        }

        player = `<div class="video-container" id="user-container-${user.uid}">
                        <div class="video-player" id="user-${user.uid}"></div> 
                 </div>`
        document.getElementById('video-streams').insertAdjacentHTML('beforeend', player)

        user.videoTrack.play(`user-${user.uid}`) // this will activate the video player
    }

    if (mediaType === 'audio'){
        user.audioTrack.play() // this will activate the audio player
    }
}

let handleUserLeft = async (user) => { // this is when the user close the tab
  delete remoteUsers[user.uid]
  document.getElementById(`user-container-${user.uid}`).remove()
}

let leaveAndRemoveLocalStream = async () => {
  for(let i = 0; localTracks.length > i; i++){
      localTracks[i].stop()
      localTracks[i].close()
  }

  await client.leave()
  document.getElementById('video-streams').innerHTML = ''
}


  const toggleCamera = async (e) => {
    if (localTracks[1].muted) {
      await localTracks[1].setMuted(false);
    } else {
      await localTracks[1].setMuted(true);
    }
  };

  const toggleMic=async(e)=>{
    if (localTracks[0].muted) {
      await localTracks[0].setMuted(false);
    } else {
      await localTracks[0].setMuted(true);
    }
  }

  const handleClick = () => {
    // Toggle between joining and leaving based on the people state.
    if (joinedPeople) {
      leaveAndRemoveLocalStream();
    } else {
      joinStream();
    }
  };

  useEffect(()=>{
    handleClick();
  },[joinedPeople])

  useEffect(()=>{
    toggleMic();
  },[currentMic])

  useEffect(()=>{
    toggleCamera();
  },[currentVideo])

  return (
    <div className=" flex justify-center h-80 w-80" id="stream-wrapper" >
      <div className=" grid h-80 w-80" id="video-streams">
       
      </div>
    </div>
  );
}

export default VideoRoom;

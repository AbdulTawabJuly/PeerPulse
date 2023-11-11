import React, { useEffect, useRef, useState } from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faThumbtack } from "@fortawesome/free-solid-svg-icons";
import { selectLoggedInUser } from "../../auth/authSlice";
import { useSelector } from "react-redux";
import { selectCameraState, selectClient,selectMicState,selectTracks } from "../../VideoCall/videoCallSlice";
function VideoIcons({ username, videoTrack,audioTrack}) {
  const user=useSelector(selectLoggedInUser);
  const [pinned, setPinned] = useState(false);
  const [localCameraState, setLocalCameraState] = useState(true); 
  const [localMicState,setLocalMicState]=useState(true);
  const ref = useRef();
  const client=useSelector(selectClient);
  const tracks=useSelector(selectTracks);
  const handlePinnedClick = () => {
    setPinned(!pinned);
  };
 const cameraState=useSelector(selectCameraState);
 const micState=useSelector(selectMicState);


  useEffect(() => {
    if (videoTrack&&localCameraState) {
      if(username===user.user.email)
      {
         client.publish(videoTrack);        
      }
      videoTrack.play(ref.current);

    } else if(videoTrack) {
      if(username===user.user.email)
      {
        videoTrack.stop();
        client.unpublish(videoTrack);
      }
    }
  }, [videoTrack, localCameraState,cameraState]);

  useEffect(() => {
    if (audioTrack&&localMicState) {
      if(username===user.user.email){
         client.publish(audioTrack); 
      }
    }       
     else if(audioTrack) {
      if(username===user.user.email)
      {
        client.unpublish(audioTrack);
      }
    }
  }, [audioTrack, localMicState,micState]);
 
  useEffect(()=>{
    if(username===user.user.email)
    {
      setLocalCameraState(cameraState);
    }
  },[cameraState,localCameraState])
  useEffect(()=>{
      if(username=user.user.email)
      {
        setLocalMicState(micState);
      }
  },[micState,localMicState])

  return (
    <>
   
      
        <div className={!pinned?"relative h-40 w-40 bg-AuthBtn-0 rounded-lg hover:scale-105":" h-80 w-96 z-50 absolute bg-AuthBtn-0 rounded-lg hover:scale-105"}>
          <div className="absolute top-0 w-full h-full" ref={ref}>

          </div>
          <div className="flex w-full h-full justify-center items-center pb-6">
             <img
                className="rounded-full w-20 h-20 "
                src="../profile.png"
                alt="img"
             ></img>
          </div>
          <div className="flex justify-center mt-5">
            <button
              onClick={() => handlePinnedClick()}
              className="absolute top-0 right-0 m-2"
            >
              <FontAwesomeIcon
                icon={faThumbtack}
                className=" text-yellow-50 hover:scale-105"
              />
            </button>
          </div>
          <p className=" absolute truncate w-28 text-white bottom-2 left-2">{username}</p>
        </div>
      
    </>
  );
}

export default VideoIcons;

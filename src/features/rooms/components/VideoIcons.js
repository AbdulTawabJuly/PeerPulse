import React, { useEffect, useRef, useState } from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faThumbtack } from "@fortawesome/free-solid-svg-icons";
import { selectCameraState } from "../../VideoCall/videoCallSlice";

function VideoIcons({ username }) {
  const [pinned, setPinned] = useState(false);
//   const cameraState = useState(selectCameraState);
//   console.log("cameraState in VidioIcons ", cameraState);
  const handlePinnedClick = () => {
    setPinned(!pinned);
    console.log(pinned);
  };

  // const ref = useRef();
  // useEffect(() => {
  //   user.videoTrack.play(ref.current);
  // }, []);


  return (
    <>
    {/* <div className=" h-80 w-80 bg-black" ref={ref}></div> */}

      {pinned && (
        <div className=" relative h-80 w-80 bg-AuthBtn-0 rounded-lg hover:scale-105 ">
          <div className="flex justify-center mt-10">
            <img
              className="rounded-full w-40 h-40 "
              src="../profile.png"
              alt="img"
            ></img>
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
          <p className=" ml-14 truncate w-50 text-2xl text-white mt-10 mb-3">{username}</p>
        </div>
      )}
      {!pinned && (
        <div className=" relative h-40 w-40 bg-AuthBtn-0 rounded-lg hover:scale-105 ">
          <div className="flex justify-center mt-5">
            <img
              className="rounded-full w-20 h-20 "
              src="../profile.png"
              alt="img"
            ></img>
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
          <p className=" ml-5 truncate w-28 text-white mt-5 mb-3">{username}</p>
        </div>
      )} 



      
    </>
  );
}
export default VideoIcons;

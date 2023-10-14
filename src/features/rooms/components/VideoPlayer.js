import React, { useEffect, useLayoutEffect, useRef } from "react";

export const VideoPlayer = ({ user, currentVideo, backGroundColor }) => {
  const ref = useRef();

  useEffect(() => {
    user.videoTrack.play(ref.current);
  }, []);

  return (
    <div>
      {currentVideo === true && <div className=" h-80 w-80" ref={ref}></div>}
      {currentVideo === false && (
        <div className=" h-80 w-80 bg-black" ref={ref}></div>
      )}
    </div>
  );
};

//style={{ width: '200px', height: '200px' }}

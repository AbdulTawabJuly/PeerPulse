import { useEffect, useRef } from "react";

function VideoPlayer({ user, Video }) {
  const ref = useRef();

  useEffect(() => {
    user.videoTrack.play(ref.current);
  }, []);
  return (
    <div className="flex justify-center mt-5">
      {Video && (
        <div ref={ref} className=" h-96 w-96 "></div>
      )}
      {!Video && (
        <div className=" h-96 w-96 bg-black"></div>
      )}
    </div>
  );
}

export default VideoPlayer;

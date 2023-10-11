import { useEffect, useRef } from "react";

function VideoPlayer({ user }) {
  const ref = useRef();

  useEffect(() => {
    user.videoTrack.play(ref.current);
  }, []);
  return (
    <div className="flex justify-center mt-5">
      <div ref={ref} className=" h-96 w-96 "></div>
    </div>
  );
}

export default VideoPlayer;

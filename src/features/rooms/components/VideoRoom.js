import React, { useEffect, useState } from "react";
import AgoraRTC from "agora-rtc-sdk-ng";
import VideoPlayer from "./VideoPlayer";

function VideoRoom() {
  const APP_ID = "2a6ac8d6740d4c80a8142151c08678ba";
  const TOKEN ="007eJxTYMi4EXI4eNnlntxnccfNU7PXv1S5/lteyXNPrMaJZt/JwSEKDEaJZonJFilm5iYGKSbJFgaJFoYmRoamhskGFmbmFkmJKkvVUhsCGRnMjNQYGRkgEMRnZggIMGJgAABASB1R"; 
  const CHANNEL = "PP2";
  const [users, setUsers] = useState([]);
  const [localTracks, setLocalTracks] = useState([]);
  const client = AgoraRTC.createClient({
    mode: "rtc",
    codec: "vp8",
  });

  const handleUserJoined = async (user, mediaType) => {
    await client.subscribe(user, mediaType);

    if (mediaType === "video") {
      setUsers((previousUsers) => [...previousUsers, user]);
    }
    if (mediaType === "audio") {
      //user.audioTrack.play()
    }
  };
  const handleUserLeft = (user) => {
    setUsers((previousUsers) =>
      previousUsers.filter((u) => u.uid !== user.uid)
    );
  };
  useEffect(() => {
    client.on("user-published", handleUserJoined);
    client.on("user-left", handleUserLeft);
    client
      .join(APP_ID, CHANNEL, TOKEN, null)
      .then((uid) =>
        Promise.all([AgoraRTC.createMicrophoneAndCameraTracks(), uid])
      )
      .then(([tracks, uid]) => {
        const [audioTrack, videoTrack] = tracks;
        setLocalTracks(tracks);
        setUsers((previousUsers) => [
          ...previousUsers,
          {
            uid,
            videoTrack,
            audioTrack,
          },
        ]);
        client.publish(tracks);
      });
    return () => {
      for (let localTrack of localTracks) {
        localTrack.stop();
        localTrack.close();
      }
      client.off("user-published", handleUserJoined);
      client.off("user-left", handleUserLeft);
      //client.unpublish(tracks).then(()=> client.leave());
    };
  }, []);

  return (
    <div className="flex flex-wrap lg:w-7/12 md:w-8/12 w-full space-x-1 space-y-1 justify-center items-center">
      {/* <h1>VideoOn</h1> */}
      {users.map((user) => (
        <VideoPlayer key={user.uid} user={user} />
      ))}
    </div>
  );
}

export default VideoRoom;

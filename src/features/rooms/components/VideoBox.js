import VideoIcons from "./VideoIcons";
import { useSelector } from "react-redux";
import { selectJoinedRoom } from "../RoomSlice";
import { useEffect, useState } from "react";
import { useSocket } from "../../../context/socket";
import AgoraRTC, { createClient } from "agora-rtc-sdk-ng";
import axios from "axios";
import { selectCameraState } from "../../VideoCall/videoCallSlice";

const APP_ID = "2a6ac8d6740d4c80a8142151c08678ba";
const TOKEN =
  "007eJxTYOC7eNI23Yi37M2VxRZSzpVrwrckuCnJpuary25/3ccdG6/AYJRolphskWJmbmKQYpJsYZBoYWhiZGhqmGxgYWZukZQY5KOf2hDIyLDb/xgLIwMEgvicDAGpqUUBpTnFqQwMAPl9HgE=";
const CHANNEL = "PeerPulse";

const client = AgoraRTC.createClient({
  mode: "rtc",
  codec: "vp8",
});

const getUpdatedRoom = async (room) => {
  try {
    const response = await axios.get("http://localhost:8080/api/room/getRoom", {
      params: {
        roomID: room,
      },
    });
    if (response.data) {
      return response.data;
    } else {
      console.log("room not found");
    }
  } catch (error) {
    console.log(error);
  }
};

function VideoBox() {
  const { getSocket } = useSocket();
  const [participants, setParticipants] = useState([]);
  const cameraState = useSelector(selectCameraState);

  const [users, setUsers] = useState([]);
  const [localTracks, setLocalTracks] = useState([]);

  const handleUserJoined = async (user, mediaType) => {
    await client.subscribe(user, mediaType);

    if (mediaType === 'video') {
      setUsers((previousUsers) => [...previousUsers, user]);
    }

    if (mediaType === 'audio') {
      // user.audioTrack.play()
    }
  };

  const handleUserLeft = (user) => {
    setUsers((previousUsers) =>
      previousUsers.filter((u) => u.uid !== user.uid)
    );
  };






  useEffect(() => {
    const newSocket = getSocket();
    if (newSocket) {
      newSocket.on("user-joined", (user) => {
        getUpdatedRoom(JoinedRoom._id).then((updatedRoom) => {
          setParticipants(updatedRoom.members);
        });
      });
      newSocket.on("user-left", (user) => {
        getUpdatedRoom(JoinedRoom._id).then((updatedRoom) => {
          setParticipants(updatedRoom.members);
        });
      });

      getUpdatedRoom(JoinedRoom._id).then((updatedRoom) => {
        setParticipants(updatedRoom.members);
      });
    }
  }, [getSocket]);


  // useEffect(() => {
  //   client.on('user-published', handleUserJoined);
  //   client.on('user-left', handleUserLeft);

  //   client
  //     .join(APP_ID, CHANNEL, TOKEN, null)
  //     .then((uid) =>
  //       Promise.all([
  //         AgoraRTC.createMicrophoneAndCameraTracks(),
  //         uid,
  //       ])
  //     )
  //     .then(([tracks, uid]) => {
  //       const [audioTrack, videoTrack] = tracks;
  //       setLocalTracks(tracks);
  //       setUsers((previousUsers) => [
  //         ...previousUsers,
  //         {
  //           uid,
  //           videoTrack,
  //           audioTrack,
  //         },
  //       ]);
  //       client.publish(tracks);
  //     });
  //     return () => {
  //       for (let localTrack of localTracks) {
  //         localTrack.stop();
  //         localTrack.close();
  //       }
  //       client.off('user-published', handleUserJoined);
  //       client.off('user-left', handleUserLeft);
  //       //client.unpublish(tracks).then(() => client.leave());
  //     };
  //   }, []);

  const JoinedRoom = useSelector(selectJoinedRoom);
  participants.slice(0, 8);
  return (
    <>
      {/* <div className="flex flex-wrap lg:w-7/12 md:w-8/12 w-full space-x-1 space-y-1 justify-center items-center">
        {users.map((user) => (
          <VideoIcons key={user.uid} user={user} />
        ))}
      </div> */}

      {!cameraState && (
        <div className="flex flex-wrap lg:w-7/12 md:w-8/12 w-full space-x-1 space-y-1 justify-center items-center">
          {participants &&
            participants.map((member) => (
              <VideoIcons key={member._id} username={member.email} />
            ))}
        </div>
      )}
    </>
  );
}
export default VideoBox;

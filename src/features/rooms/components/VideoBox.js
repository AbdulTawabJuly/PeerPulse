import VideoIcons from "./VideoIcons";
import { useSelector } from "react-redux";
import { selectJoinedRoom, selectToken } from "../RoomSlice";
import { useEffect, useState } from "react";
import { useSocket } from "../../../context/socket";
import axios from "axios";
import { selectCameraState } from "../../VideoCall/videoCallSlice";

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
  const TOKEN = useSelector(selectToken);  // This can be used for AGORA video call functionality

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

  const JoinedRoom = useSelector(selectJoinedRoom);
  participants.slice(0, 8);
  return (
    <>
      <div className="flex flex-wrap lg:w-7/12 md:w-8/12 w-full space-x-1 space-y-1 justify-center items-center">
        {participants &&
          participants.map((member) => (
            <VideoIcons key={member._id} username={member.email} />
          ))}
      </div>
    </>
  );
}
export default VideoBox;

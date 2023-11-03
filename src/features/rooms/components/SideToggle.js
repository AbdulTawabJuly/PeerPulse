import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { selectJoinedRoom } from "../RoomSlice";
import {selectLoggedInUser} from "../../auth/authSlice";
import Member from "./Member"
import Messages from "./Messages";
import GPT from "./GPTIntegration"
import { useSocket } from '../../../context/socket'
import axios from "axios";

function SideToggle() {
  const { getSocket } = useSocket();
  const [Members, SetMembers] = useState(false);
  const [participants, setParticipants] = useState([]);
  const [Chat, SetChat] = useState(true);
  const [ChatGpt, SetChatGpt] = useState(false);
  const JoinedRoom = useSelector(selectJoinedRoom);
  const memberList = JoinedRoom.members;
  const user = useSelector(selectLoggedInUser);
  
  const HandleMemberClick = () => {
    if (!Members) {
      SetMembers(true);
      SetChat(false);
      SetChatGpt(false);
    }
  };
  const HandleChatClick = () => {
    if (!Chat) {
      SetMembers(false);
      SetChat(true);
      SetChatGpt(false);
    }
  };
  const HandleChatGptClick = () => {
    if (!ChatGpt) {
      SetMembers(false);
      SetChat(false);
      SetChatGpt(true);
    }
  };

  const getUpdatedRoom = async (room) => {
    try {
      const response = await axios.get("http://localhost:8080/api/room/getRoom", {
        params: {
          roomID: room
        }
      })
      if (response.data) {
        return response.data;
      }
      else {
        console.log("room not found");
      }
    }
    catch(error) {
      console.log(error);
    }
       
  }

  function pushUser(user) {
    const exists = participants.some(item => item._id === user._id);
    if (!exists) {
      participants.push(user);
    }
  }

  useEffect(() => {

    const newSocket = getSocket();
    if (newSocket) {
      newSocket.on("user-joined", (user) => {
        getUpdatedRoom(JoinedRoom._id)
          .then((updatedRoom)=> {
            setParticipants(updatedRoom.members);
          })
      })
      newSocket.on("user-left",(user) => {
        getUpdatedRoom(JoinedRoom._id)
          .then((updatedRoom)=> {
            setParticipants(updatedRoom.members);
          })
      })

      getUpdatedRoom(JoinedRoom._id)
          .then((updatedRoom)=> {
            setParticipants(updatedRoom.members);
          })
    }

  }, [getSocket]);

  return (
    <div className="h-96 w-96 bg-white border border-gray-600  rounded-lg flex flex-row items-start lg:block md:block">
      <button
        onClick={() => HandleChatClick()}
        className="p-3 w-1/3 bg-AuthBtn-0 rounded-tl-lg text-white hover:scale-105 border border-white"
      >
        Chat
      </button>
      <button
        onClick={() => HandleChatGptClick()}
        className="p-3 w-1/3 bg-AuthBtn-0 text-white hover:scale-105 border border-white"
      >
        GPT
      </button>
      <button
        onClick={() => HandleMemberClick()}
        className="p-3 w-1/3 bg-AuthBtn-0 rounded-tr-lg text-white hover:scale-105 border border-white"
      >
        Members
      </button>
      {Members && (<div className="max-h-80 overflow-y-auto">

        {participants && (participants.map((member) => (
          <Member key={member._id} username={member.email} />
        )))}
      </div>)}
      <div>{Chat && <Messages />}</div>
      
      <div>{ChatGpt && <GPT/>}</div>
    </div>
  );
}
export default SideToggle;

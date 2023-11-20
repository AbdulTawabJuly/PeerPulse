import { useSelector } from "react-redux";
import { JoinRoom, selectIsCreator } from "../RoomSlice";
import { selectLoggedInUser } from "../../auth/authSlice";
import { useSocket } from "../../../context/socket";
import { selectJoinedRoom } from "../RoomSlice";
import { useParams } from "react-router-dom";
import { sendMessage } from "../../chat/ChatSlice";
import { useDispatch } from "react-redux";
import { selectMicState } from "../../VideoCall/videoCallSlice";
import { useEffect, useState } from "react";
import { toast } from "react-toastify";
import { selectIsModerator } from "../RoomSlice";
import { selectStatus } from "../RoomSlice";
import { selectModStatus } from "../../Moderator/ModeratorSlice";
import { RemoveModerator,MakeModerator } from "../../Moderator/ModeratorSlice";
function Member({ userID,username, micstate,Moderator }) {
  const isCreator = useSelector(selectIsCreator);
  const isModerator = useSelector(selectIsModerator);
  const user = useSelector(selectLoggedInUser);
  const status=useSelector(selectStatus);
  const { getSocket } = useSocket();
  const socket = getSocket();
  const RoomID = useParams();
  const RoomJoined=useSelector(selectJoinedRoom);
  const moderatorStatus=useSelector(selectModStatus);
  const dispatch = useDispatch();
  const MuteUser = (user) => {
    socket.emit("toggle-mic", user, micstate, RoomID);
  };
  const KickUser = (user) => {
    const newMessage = {
      type: "kicked",
      user: user,
    };

    dispatch(sendMessage(newMessage));
    socket.emit("kick-user", user, RoomID);
    toast.success(`${user} has been kicked out.`, {
      position: "bottom-right",
      autoClose: 2000,
      hideProgressBar: true,
      closeOnClick: true,
      pauseOnHover: true,
      draggable: true,
      progress: undefined,
      theme: "colored",
    });
  };
  const BanUser = (user) => {
    const newMessage = {
      type: "banned",
      user: user,
    };

    dispatch(sendMessage(newMessage));
    socket.emit("ban-user", user, RoomID);
    toast.success(`${user} has been banned.`, {
      position: "bottom-right",
      autoClose: 2000,
      hideProgressBar: true,
      closeOnClick: true,
      pauseOnHover: true,
      draggable: true,
      progress: undefined,
      theme: "colored",
    });
  };
  const makeModerator=(user,userID)=>{

    const RoomDetail = {
      id: RoomID,
      user_: userID,
    };
    dispatch(MakeModerator(RoomDetail));
    if(moderatorStatus==="fulfilled")
    {
      socket.emit("make-moderator", user,userID, RoomID);
      toast.success(`${user} is a moderator now.`, {
        position: "bottom-right",
        autoClose: 2000,
        hideProgressBar: true,
        closeOnClick: true,
        pauseOnHover: true,
        draggable: true,
        progress: undefined,
        theme: "colored",
      });
    }
    
  }
  const removeModerator=(user,userID)=>{
    const RoomDetail = {
      id: RoomID,
      user_: userID,
    };
    dispatch(RemoveModerator(RoomDetail));
    if(moderatorStatus==="fulfilled")
    {
       socket.emit("remove-moderator", user,userID, RoomID);
       toast.success(`${user} has been dismissed as a moderator`, {
        position: "bottom-right",
        autoClose: 2000,
        hideProgressBar: true,
        closeOnClick: true,
        pauseOnHover: true,
        draggable: true,
        progress: undefined,
        theme: "colored",
      });
    }
  }
  
  return (
    <div className="flex flex-row items-center p-3 px-0 w-full border-b border-gray-600">
      <img
        className="w-10 h-10 border border-black rounded-full mx-3"
        src="../profile.png"
        alt="img"
      ></img>
      <p className="w-full truncate">{username}</p>
      {(isCreator || isModerator) && username !== user.user.email&&userID!==RoomJoined.createdBy && (
        <div className="pt-2 pr-4 flex flex-row justify-end">
          {micstate === false && (
            <div className="group relative">
              <svg
                xmlns="http://www.w3.org/2000/svg"
                onClick={() => MuteUser(username)}
                width="20"
                height="20"
                fill="grey"
                className="bi bi-mic-mute-fill hover:cursor-pointer hover:opacity-60 mr-1 group"
                viewBox="0 0 16 16"
              >
                <path d="M13 8c0 .564-.094 1.107-.266 1.613l-.814-.814A4.02 4.02 0 0 0 12 8V7a.5.5 0 0 1 1 0v1zm-5 4c.818 0 1.578-.245 2.212-.667l.718.719a4.973 4.973 0 0 1-2.43.923V15h3a.5.5 0 0 1 0 1h-7a.5.5 0 0 1 0-1h3v-2.025A5 5 0 0 1 3 8V7a.5.5 0 0 1 1 0v1a4 4 0 0 0 4 4zm3-9v4.879L5.158 2.037A3.001 3.001 0 0 1 11 3z" />
                <path d="M9.486 10.607 5 6.12V8a3 3 0 0 0 4.486 2.607zm-7.84-9.253 12 12 .708-.708-12-12-.708.708z" />
              </svg>
              <p className="hidden group-hover:block absolute bottom-7 left-2 text-[10px] text-white bg-gray-500 p-1 rounded-lg">
                Unmute
              </p>
            </div>
          )}

          {micstate === true && (
            <div className="group relative">
              <svg
                xmlns="http://www.w3.org/2000/svg"
                width="20"
                height="20"
                fill="grey"
                className="bi bi-mic-fill hover:cursor-pointer hover:opacity-60 mr-1"
                viewBox="0 0 16 16"
                onClick={() => MuteUser(username)}
              >
                {" "}
                <path d="M5 3a3 3 0 0 1 6 0v5a3 3 0 0 1-6 0V3z" />{" "}
                <path d="M3.5 6.5A.5.5 0 0 1 4 7v1a4 4 0 0 0 8 0V7a.5.5 0 0 1 1 0v1a5 5 0 0 1-4.5 4.975V15h3a.5.5 0 0 1 0 1h-7a.5.5 0 0 1 0-1h3v-2.025A5 5 0 0 1 3 8V7a.5.5 0 0 1 .5-.5z" />{" "}
              </svg>
              <p className="hidden group-hover:block absolute bottom-7 left-2 text-[10px] text-white bg-gray-500 p-1 rounded-lg">
                Mute
              </p>
            </div>
          )}
          <div className="group relative">
            <svg
              className="hover:cursor-pointer hover:opacity-60"
              onClick={() => BanUser(username)}
              xmlns="http://www.w3.org/2000/svg"
              viewBox="0 0 30 30"
              width="24"
              height="24"
              fill="none"
              stroke="grey"
              stroke-width="2"
              stroke-linecap="round"
              stroke-linejoin="round"
            >
              <circle cx="12" cy="12" r="10" />
              <line x1="5.63" y1="5.63" x2="18.37" y2="18.37" />
            </svg>
            <p className="hidden group-hover:block absolute bottom-7 left-2 text-[10px] text-white bg-gray-500 p-1 px-2 rounded-lg">
              Ban
            </p>
          </div>
          <div className="group relative">
            <svg
              className="pb-0.5 hover:cursor-pointer hover:opacity-60"
              onClick={() => KickUser(username)}
              viewBox="0 0 1124 1124"
              xmlns="http://www.w3.org/2000/svg"
              width="24"
              height="24"
            >
              <path
                fill="grey"
                d="M512 64a448 448 0 1 1 0 896 448 448 0 0 1 0-896zM288 512a38.4 38.4 0 0 0 38.4 38.4h371.2a38.4 38.4 0 0 0 0-76.8H326.4A38.4 38.4 0 0 0 288 512z"
              />
            </svg>
            <p className="hidden group-hover:block absolute bottom-7 left-2 text-[10px] text-white bg-gray-500 p-1 px-2 rounded-lg">
              Kick
            </p>
          </div>
          {isCreator&&!Moderator&&(
          <div className="group relative">
            <svg
              xmlns="http://www.w3.org/2000/svg"
              className="hover:cursor-pointer hover:opacity-60"
              width="24"
              height="24"
              viewBox="0 0 24 24"
              onClick={()=>makeModerator(username,userID)}
            >
              <path
                fill="grey"
                d="M17 10c1.08 0 2.09.25 3 .68v-4.3a2 2 0 0 0-1.3-1.87l-6-2.25c-.45-.17-.95-.17-1.4 0l-6 2.25C4.52 4.81 4 5.55 4 6.39v4.7c0 5.05 3.41 9.76 8 10.91c.03-.01.05-.02.08-.02A6.996 6.996 0 0 1 10 17c0-3.87 3.13-7 7-7z"
              />
              <path
                fill="grey"
                d="M17 12c-2.76 0-5 2.24-5 5s2.24 5 5 5s5-2.24 5-5s-2.24-5-5-5zm2.5 5.5h-2v2c0 .28-.22.5-.5.5s-.5-.22-.5-.5v-2h-2c-.28 0-.5-.22-.5-.5s.22-.5.5-.5h2v-2c0-.28.22-.5.5-.5s.5.22.5.5v2h2c.28 0 .5.22.5.5s-.22.5-.5.5z"
              />
            </svg>
            <p className="hidden group-hover:block absolute bottom-7 right-2 text-[10px] text-white bg-gray-500 p-1 px-2 rounded-lg">
              Moderator
            </p>
          </div>)
          }
          {
            isCreator&&Moderator&&(
              <div className="group relative">
              <svg onClick={()=>removeModerator(username,userID)} xmlns="http://www.w3.org/2000/svg" className="pb-0.5 hover:cursor-pointer hover:opacity-60" width="24" height="24" viewBox="0 0 24 24"><path fill="grey" d="M18.85 16.05L6.8 3.95L12 2l8 3v6.1q0 1.275-.288 2.525t-.862 2.425Zm.95 6.55l-3.25-3.25q-.95.975-2.113 1.638T12 22q-3.475-.875-5.738-3.988T4 11.1V6.8L1.4 4.2l1.4-1.4l18.4 18.4l-1.4 1.4Z"/></svg>
              <p className="hidden group-hover:block absolute bottom-7 right-2 text-[10px] text-white bg-gray-500 p-1 px-2 rounded-lg">
                UnMod
              </p>
            </div>
            )
          }
        </div>
        
      )}
    </div>
  );
}
export default Member;

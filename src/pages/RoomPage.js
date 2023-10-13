import VideoBox from "../features/rooms/components/VideoBox";
import Navbar from "../features/Navbar/Navbar";
import SideToggle from "../features/rooms/components/SideToggle";
import { useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import { useRef } from "react";
import axios from "axios";
import RoomNotFound from "./RoomNotFound";
import TimeUp from "../features/rooms/components/TimeUp";
import { io } from "socket.io-client";
import { useSelector } from "react-redux";
import { PacmanLoader } from "react-spinners";
import { useSocket } from "../context/socket";
import {
  sendMessage,
  selectMessages,
  emptyMessages,
} from "../features/chat/ChatSlice";
import {
  toggleCamera,
  toggleMic,
  JoinStream,
  LeaveStream,
  selectJoinedPeople,
} from "../features/VideoCall/videoCallSlice";

import {
  LeaveRoom,
  selectJoinedRoom,
  selectStatus,
  JoinRoom,
  GetJoinedRoom,
  getRoom,
} from "../features/rooms/RoomSlice";
import { selectLoggedInUser } from "../features/auth/authSlice";
import { useDispatch } from "react-redux";
import VideoRoom from "../features/rooms/components/VideoRoom";
function RoomPage() {
  const [micMute, setMicMute] = useState(true);
  const [isVideoOff, setVideoOff] = useState(true);
  const [joined, setJoined] = useState(false);
  const [isMenuOpen, OpenMenu] = useState(false);
  const [isMobile, setIsMobile] = useState(false);
  const { socket, initializeSocket, destroySocket, getSocket } = useSocket();

  const roomID = useParams();
  const [roomJoined, SetRoomJoined] = useState({});
  const [Error, SetError] = useState("");
  const [timeLeft, setTimeLeft] = useState("");
  const [Expired, SetExpired] = useState(false);
  const [MemberList, SetMemberList] = useState([]);
  const user = useSelector(selectLoggedInUser);
  const joinedPeople=useSelector(selectJoinedPeople)
  const dispatch = useDispatch();
  const RoomJoined = useSelector(selectJoinedRoom);
  const status = useSelector(selectStatus);
  const navigate = useNavigate();
  const handleResize = () => {
    if (window.innerWidth < 1098) {
      setIsMobile(true);
    } else {
      setIsMobile(false);
    }
  };

  const handlePopState = async () => {
    if (status === "fulfilled") {
      const RoomDetail = {
        id: roomID,
        user_: user.user.id,
      };
      await dispatch(LeaveRoom(RoomDetail));
      while (status === "loading");
    }
  };

  const GetRoomData = async (id) => {
    try {
      const RoomDetail = {
        id: roomID,
        user_: user.user.id,
      };
      await dispatch(JoinRoom(RoomDetail));
    } catch (error) {
      SetError(error);
    }
  };

  useEffect(() => {
    handleResize();
    window.addEventListener("resize", handleResize);
    window.addEventListener("popstate", handlePopState);
    GetRoomData(roomID);
  }, []);

  useEffect(() => {
    if (RoomJoined) {
      const intervalId = setInterval(() => {
        const givenDate = new Date(RoomJoined.startingTime);
        const currentTime = Date.now();
        const timePassed = currentTime - givenDate.getTime();
        const MinutesWeHave = Math.floor(60 - timePassed / (1000 * 60));
        const SecondsWeHave = Math.floor((3600 - timePassed / 1000) % 60);
        if (MinutesWeHave < 0) {
          SetExpired(true);
        } else {
          setTimeLeft(MinutesWeHave + ":" + SecondsWeHave);
        }
      }, 100);

      return () => clearInterval(intervalId);
    }
  }, [RoomJoined]);

  const messages = useSelector(selectMessages);

  useEffect(() => {
    initializeSocket(user.user.id);
    if (messages.length === 0) {
      const newMsg = {
        type: "join",
        user: user.user.email,
      };
      dispatch(sendMessage(newMsg));
    }
  }, []);

  useEffect(() => {
    const newSocket = getSocket();
    if (newSocket) {
      newSocket.emit("join-room", roomID.id, user.user.email);

      newSocket.on("user-joined", (user) => {
        const newMsg = {
          type: "join",
          user: user,
        };
        dispatch(sendMessage(newMsg));
      });

      newSocket.on("user-left", (user) => {
        const newMsg = {
          type: "left",
          user: user,
        };
        dispatch(sendMessage(newMsg));
      });

      newSocket.on("recieve-message", (message) => {
        console.log("in recieve message of fe");
        const newMsg = {
          type: "recieved",
          user: message.user,
          content: message.content,
        };
        dispatch(sendMessage(newMsg));
      });
    }
  }, [getSocket]);

  const HandleMicClick = () => {
    dispatch(toggleMic());
    setMicMute(!micMute);
  };
  const HandleVideoClick = () => {
    dispatch(toggleCamera());
    setVideoOff(!isVideoOff)
  };

  const handleJoin = () => {
    dispatch(JoinStream());
  };

  const handleEndCall = async () => {
    if (status === "fulfilled") {
      const newSocket = getSocket();
      newSocket.emit("leave-room", user.user.email, roomID.id);
      destroySocket();
      const RoomDetail = {
        id: roomID,
        user_: user.user.id,
      };
      await dispatch(LeaveRoom(RoomDetail));
      dispatch(LeaveStream());
      dispatch(emptyMessages());
      if (status === "fulfilled") {
        navigate("/");
      }
    }
  };

  return (
    <>
      {status === "loading" && (
        <div className="min-h-screen bg-Auth-0">
          <Navbar></Navbar>
          <div className="flex items-center justify-center">
            <PacmanLoader color="#435334" />
          </div>
        </div>
      )}
      {!Expired && status === "fulfilled" && RoomJoined && (
        <div className="min-h-screen bg-Auth-0">
          <Navbar></Navbar>
          {isMobile && (
            <button
              type="button"
              onClick={() => OpenMenu(!isMenuOpen)}
              aria-controls="drawer-navigation"
              className="text-gray-400 bg-transparent hover:bg-gray-200 hover:text-gray-900 rounded-lg text-sm p-1.5 absolute top-3.5 left-3 inline-flex items-center dark:hover:bg-gray-600 dark:hover:text-white"
            >
              <svg
                xmlns="http://www.w3.org/2000/svg"
                viewBox="0 0 24 24"
                fill="currentColor"
                className="w-6 h-6"
              >
                <path d="M0 0h24v24H0z" fill="none" />
                <path d="M4 6h16v2H4zm0 5h16v2H4zm0 5h16v2H4z" />
              </svg>
            </button>
          )}
          <div className="flex flex-row justify-around mt-2 lg:space-x-96 md:space-x-96 mb-2">
            <div className="w-1/3 h-12  mb-0 bg-gray-900 p-6 rounded-full flex items-center">
              <p className="lg:text-lg md:text-sm text-xs  font-bold text-white ">
                Room Name : {RoomJoined.name}
              </p>
            </div>
            <div className="  w-32 h-12  mb-0 bg-gray-900 rounded-full p-6 flex items-center flex-row justify-center">
              <svg
                width="15"
                height="15"
                viewBox="0 0 15 15"
                fill="white"
                xmlns="http://www.w3.org/2000/svg"
              >
                {" "}
                <path
                  fill-rule="evenodd"
                  clip-rule="evenodd"
                  d="M13.15 7.49998C13.15 4.66458 10.9402 1.84998 7.50002 1.84998C4.7217 1.84998 3.34851 3.90636 2.76336 4.99997H4.5C4.77614 4.99997 5 5.22383 5 5.49997C5 5.77611 4.77614 5.99997 4.5 5.99997H1.5C1.22386 5.99997 1 5.77611 1 5.49997V2.49997C1 2.22383 1.22386 1.99997 1.5 1.99997C1.77614 1.99997 2 2.22383 2 2.49997V4.31318C2.70453 3.07126 4.33406 0.849976 7.50002 0.849976C11.5628 0.849976 14.15 4.18537 14.15 7.49998C14.15 10.8146 11.5628 14.15 7.50002 14.15C5.55618 14.15 3.93778 13.3808 2.78548 12.2084C2.16852 11.5806 1.68668 10.839 1.35816 10.0407C1.25306 9.78536 1.37488 9.49315 1.63024 9.38806C1.8856 9.28296 2.17781 9.40478 2.2829 9.66014C2.56374 10.3425 2.97495 10.9745 3.4987 11.5074C4.47052 12.4963 5.83496 13.15 7.50002 13.15C10.9402 13.15 13.15 10.3354 13.15 7.49998ZM7 10V5.00001H8V10H7Z"
                  fill="white"
                />{" "}
              </svg>
              <p className=" text-lg font-bold text-white lg:text-lg md:text-sm text-xs ml-2">
                {" "}
                {timeLeft}
              </p>
            </div>
          </div>

          <div className="flex flex-row justify-around items-center mb-2 h-full">
           {joinedPeople && <VideoRoom></VideoRoom>}
           {!joinedPeople && <VideoBox></VideoBox>}
            {!isMobile && <SideToggle></SideToggle>}
            {isMenuOpen && (
              <div className="fixed top-12 left-8">
                <SideToggle />
              </div>
            )}
          </div>
          <div className="flex flex-row justify-center w-full">
            <button
              onClick={() => handleJoin()}
              className=" w-14 h-14 flex justify-center rounded-full bg-red-900 mr-4 hover:scale-105"
            >
              <svg
                fill="white"
                viewBox="0 0 26 26"
                className="bi bi-mic-mute-fill mt-3"
                xmlns="http://www.w3.org/2000/svg"
                width="36"
                height="36"
              >
                <path d="M20.25 3.75v4.5m0-4.5h-4.5m4.5 0l-6 6m3 12c-8.284 0-15-6.716-15-15V4.5A2.25 2.25 0 014.5 2.25h1.372c.516 0 .966.351 1.091.852l1.106 4.423c.11.44-.054.902-.417 1.173l-1.293.97a1.062 1.062 0 00-.38 1.21 12.035 12.035 0 007.143 7.143c.441.162.928-.004 1.21-.38l.97-1.293a1.125 1.125 0 011.173-.417l4.423 1.106c.5.125.852.575.852 1.091V19.5a2.25 2.25 0 01-2.25 2.25h-2.25z"></path>
              </svg>
            </button>

            <button
              onClick={() => HandleMicClick()}
              className=" w-14 h-14 flex justify-center rounded-full bg-red-900 mr-4 hover:scale-105"
            >
              {micMute && (
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  width="32"
                  height="32"
                  fill="white"
                  className="bi bi-mic-mute-fill mt-3"
                  viewBox="0 0 16 16"
                >
                  <path d="M13 8c0 .564-.094 1.107-.266 1.613l-.814-.814A4.02 4.02 0 0 0 12 8V7a.5.5 0 0 1 1 0v1zm-5 4c.818 0 1.578-.245 2.212-.667l.718.719a4.973 4.973 0 0 1-2.43.923V15h3a.5.5 0 0 1 0 1h-7a.5.5 0 0 1 0-1h3v-2.025A5 5 0 0 1 3 8V7a.5.5 0 0 1 1 0v1a4 4 0 0 0 4 4zm3-9v4.879L5.158 2.037A3.001 3.001 0 0 1 11 3z" />
                  <path d="M9.486 10.607 5 6.12V8a3 3 0 0 0 4.486 2.607zm-7.84-9.253 12 12 .708-.708-12-12-.708.708z" />
                </svg>
              )}
              {!micMute && (
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  width="32"
                  height="32"
                  fill="white"
                  className="bi bi-mic-fill mt-3"
                  viewBox="0 0 16 16"
                >
                  {" "}
                  <path d="M5 3a3 3 0 0 1 6 0v5a3 3 0 0 1-6 0V3z" />{" "}
                  <path d="M3.5 6.5A.5.5 0 0 1 4 7v1a4 4 0 0 0 8 0V7a.5.5 0 0 1 1 0v1a5 5 0 0 1-4.5 4.975V15h3a.5.5 0 0 1 0 1h-7a.5.5 0 0 1 0-1h3v-2.025A5 5 0 0 1 3 8V7a.5.5 0 0 1 .5-.5z" />{" "}
                </svg>
              )}
            </button>

            <button
              onClick={() => HandleVideoClick()}
              className=" w-14 h-14 flex justify-center  rounded-full bg-red-900 mr-4 hover:scale-105"
            >
              {isVideoOff && (
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  width="32"
                  height="32"
                  fill="white"
                  className="bi bi-camera-video-off-fill mt-3"
                  viewBox="0 0 16 16"
                >
                  {" "}
                  <path
                    fill-rule="evenodd"
                    d="M10.961 12.365a1.99 1.99 0 0 0 .522-1.103l3.11 1.382A1 1 0 0 0 16 11.731V4.269a1 1 0 0 0-1.406-.913l-3.111 1.382A2 2 0 0 0 9.5 3H4.272l6.69 9.365zm-10.114-9A2.001 2.001 0 0 0 0 5v6a2 2 0 0 0 2 2h5.728L.847 3.366zm9.746 11.925-10-14 .814-.58 10 14-.814.58z"
                  />{" "}
                </svg>
              )}
              {!isVideoOff && (
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  width="32"
                  height="32"
                  fill="white"
                  className="bi bi-camera-video-fill mt-3"
                  viewBox="0 0 16 16"
                >
                  {" "}
                  <path
                    fill-rule="evenodd"
                    d="M0 5a2 2 0 0 1 2-2h7.5a2 2 0 0 1 1.983 1.738l3.11-1.382A1 1 0 0 1 16 4.269v7.462a1 1 0 0 1-1.406.913l-3.111-1.382A2 2 0 0 1 9.5 13H2a2 2 0 0 1-2-2V5z"
                  />{" "}
                </svg>
              )}
            </button>
            <button
              onClick={() => handleEndCall()}
              className=" w-20 h-14 flex justify-center rounded-full bg-red-900 hover:scale-105"
            >
              <svg
                xmlns="http://www.w3.org/2000/svg"
                className="mt-2"
                width="49"
                height="40"
                viewBox="0 0 24 24"
                fill="white"
              >
                <path
                  fill="white"
                  d="M23 12.5 20.5 15l-3-2V8.842C15.976 8.337 14.146 8 12 8c-2.145 0-3.976.337-5.5.842V13l-3 2L1 12.5c.665-.997 2.479-2.657 5.5-3.658C8.024 8.337 9.855 8 12 8c2.146 0 3.976.337 5.5.842 3.021 1 4.835 2.66 5.5 3.658z"
                />
                <path
                  stroke="white"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth="2"
                  d="M17.5 8.842C15.976 8.337 14.146 8 12 8c-2.145 0-3.976.337-5.5.842m11 0c3.021 1 4.835 2.66 5.5 3.658L20.5 15l-3-2V8.842zm-11 0c-3.021 1-4.835 2.66-5.5 3.658L3.5 15l3-2V8.842z"
                />
              </svg>
            </button>
          </div>
        </div>
      )}
      {status === "error" && <RoomNotFound></RoomNotFound>}
      {Expired && <TimeUp />}
    </>
  );
}
export default RoomPage;

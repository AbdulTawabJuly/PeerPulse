import VideoBox from "../features/rooms/components/VideoBox";
import Navbar from "../features/Navbar/Navbar";
import SideToggle from "../features/rooms/components/SideToggle";
import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import { useRef } from "react";
import axios from "axios";
import RoomNotFound from "./RoomNotFound";
import TimeUp from "../features/rooms/components/TimeUp";
import {io} from 'socket.io-client'
import { UseSelector, useSelector } from "react-redux/es/hooks/useSelector";
import { selectJoinedRoom } from "../features/rooms/RoomSlice";
import { selectLoggedInUser } from "../features/auth/authSlice";
function RoomPage() {
  const [micMute, setMicMute] = useState(true);
  const [isVideoOff, setVideoOff] = useState(true);
  const [isMenuOpen, OpenMenu] = useState(false);
  const [isMobile, setIsMobile] = useState(false);
  const roomID = useParams();
  const [roomJoined, SetRoomJoined] = useState({});
  const [Error, SetError] = useState("");
  const [timeLeft, setTimeLeft] = useState("");
  const [Expired, SetExpired] = useState(false);
  const user=useSelector(selectLoggedInUser);
  
  
  const handleResize = () => {
    if (window.innerWidth < 1098) {
      setIsMobile(true);
    } else {
      setIsMobile(false);
    }
  };
  const handlePopState=()=>{
    
  }
  const GetRoomData = async (id) => {
    try {
      const response = await axios.get(
        "http://localhost:8080/api/room/JoinRoom",
        {
          params: {
            RoomID: id,
            UserID:user.user.id,
          },
        }
      );
      SetRoomJoined(response.data);
      const room = response.data._id;
      const socket = io.connect('http://localhost:8080');
      socket.emit('join-room',room)

    } catch (error) {
      SetError(error);
    }
  };
  useEffect(() => {
    handleResize();
    window.addEventListener("resize", handleResize);
    window.addEventListener('popstate',handlePopState);
    GetRoomData(roomID);
  }, []);

  useEffect(() => {
    const intervalId = setInterval(() => {
      const givenDate = new Date(roomJoined.startingTime);
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
  }, [roomJoined]);

  const HandleMicClick = () => {
    setMicMute(!micMute);
  };
  const HandleVideoClick = () => {
    setVideoOff(!isVideoOff);
  };


  return (
    <>
      {!Error && !Expired && (
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
                Room Name : {roomJoined.name}
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
            <VideoBox></VideoBox>
            {!isMobile && <SideToggle></SideToggle>}
            {isMenuOpen && (
              <div className="fixed top-12 left-8">
                <SideToggle />
              </div>
            )}
          </div>
          <div className="flex flex-row justify-center w-full">
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
            <button className=" w-20 h-14 flex justify-center rounded-full bg-red-900 hover:scale-105">
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
      {Error && <RoomNotFound></RoomNotFound>}
      {Expired && <TimeUp />}
    </>
  );
}
export default RoomPage;

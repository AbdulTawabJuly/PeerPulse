import VideoBox from "../features/rooms/components/VideoBox";
import {Link} from 'react-router-dom'
import Navbar from "../features/Navbar/Navbar";
import SideToggle from "../features/rooms/components/SideToggle";
import { useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import RoomNotFound from "./RoomNotFound";
import TimeUp from "../features/rooms/components/TimeUp";
import { io } from "socket.io-client";
import { useSelector } from "react-redux";
import { PacmanLoader } from "react-spinners";
import { useSocket } from "../context/socket";
import { toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.min.css";
import { ImExit } from "react-icons/im";
import { useBeforeUnload } from "react-router-dom";
import {
  sendMessage,
  selectMessages,
  emptyMessages,
} from "../features/chat/ChatSlice";
import {
  sendgptMessage,
  selectGPTMessages,
  emptygptMessages,
} from "../features/GPT/GPTSlice";
import {
  SetClient,
  SetTracks,
  selectCameraState,
  selectMicState,
  SetCameraState,
  toggleCamera,
  toggleMic,
  SetMicState,
} from "../features/VideoCall/videoCallSlice";

import {
  LeaveRoom,
  selectJoinedRoom,
  selectStatus,
  JoinRoom,
  SetCreator,
  BanUser,
  GetJoinedRoom,
  getRoom,
  getTokenAsync,
  selectToken,
  SetModerator,
} from "../features/rooms/RoomSlice";
import { MakeModerator,RemoveModerator } from "../features/Moderator/ModeratorSlice";

import { selectLoggedInUser } from "../features/auth/authSlice";
import { useDispatch } from "react-redux";
import LoadingScreen from 'react-loading-screen';
import AgoraRTC from "agora-rtc-sdk-ng";
const APP_ID = "e3a46af1a70746148c7abd4c4785f262";
const client = AgoraRTC.createClient({
  mode: "rtc",
  codec: "vp8",
});

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
  const cameraState = useSelector(selectCameraState);
  const micState = useSelector(selectMicState);
  const [Loading,SetLoading]=useState(false);


  const dispatch = useDispatch();
  const RoomJoined = useSelector(selectJoinedRoom);
  const status = useSelector(selectStatus);
  const navigate = useNavigate();
  const [users, setUsers] = useState([]);
  const [localTracks, setLocalTracks] = useState([]);

  const handleResize = () => {
    if (window.innerWidth < 1098) {
      setIsMobile(true);
    } else {
      setIsMobile(false);
    }
  };

  const handlePopState = async (ev) => {
    if (status === "fulfilled"&&RoomJoined) {  
      const RoomDetail = {
        id: roomID,
        user_: user.user.id,
      };
      await dispatch(LeaveRoom(RoomDetail));
      dispatch(emptyMessages());
      dispatch(emptygptMessages());
      dispatch(SetCreator(false));
      while (status === "loading");
    }
  };
  useBeforeUnload(()=>{
    if (status === "fulfilled"&&RoomJoined) {
      const RoomDetail = {
        id: roomID,
        user_: user.user.id,
      };
      const newSocket = getSocket();
      newSocket.emit("leave-room", user.user.email, roomID.id);
      destroySocket();
      dispatch(LeaveRoom(RoomDetail));
      dispatch(emptyMessages());
      dispatch(emptygptMessages());
      dispatch(SetCreator(false));
      while (status === "loading");
    }
  })

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

  useEffect(()=>{
  },[Loading])

  const handleUserJoined = (user) => {
    setUsers((previousUsers) => [...previousUsers, user]);
  };

  const handleUserLeft = (user) => {
    setUsers((previousUsers) =>
      previousUsers.filter((u) => u.uid !== user.uid)
    );
  };
  const handleUserPublished = async (user, mediaType) => {
    try {
      await client.subscribe(user, mediaType);
      if (mediaType === "audio") {
        user.audioTrack.play();
      }
    } catch (error) {
      console.log(error);
    }
  };
  const handleUserUnpublished = () => {};

  useEffect(() => {
    handleResize();
    window.addEventListener("resize", handleResize);
    window.addEventListener("popstate", handlePopState);

    dispatch(SetCameraState(!isVideoOff));
    dispatch(SetMicState(!micMute));

    GetRoomData(roomID);
  }, []);

  useEffect(() => {
    if (RoomJoined) {
      if (RoomJoined.createdBy === user.user.id) {
        dispatch(SetCreator(true));
      }
      if (RoomJoined.moderators.includes(user.user.id)) {
        dispatch(SetModerator(true));
      }
      console.log(RoomJoined.members);
      let Token;
      try{
      Token=RoomJoined.members.find(member=>member._id===user.user.id).AgoraToken;
      }catch(error){
        alert('There was an error connecting. Please try again in some time.')
      }
      SetLoading(true);
      client
        .join(APP_ID, RoomJoined._id, Token, user.user.email)
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
          dispatch(SetClient(client));
          dispatch(SetTracks(tracks));
        })
        .catch((error) => {
          alert('An error occured while connecting .Please try again.');
        }).finally(()=>{
          SetLoading(false);
        });
      client.on("user-published", handleUserPublished);
      client.on("user-unpublished", handleUserUnpublished);
      client.on("user-joined", handleUserJoined);
      client.on("user-left", handleUserLeft);

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
      return () => {
        for (let localTrack of localTracks) {
          localTrack.stop();
          localTrack.close();
        }
        client.off("user-published", handleUserPublished);
        client.off("user-unpublished", handleUserUnpublished);
        client.off("user-joined", handleUserJoined);
        client.off("user-left", handleUserLeft);
        client.leave();
        clearInterval(intervalId);
      };
    }
  }, [RoomJoined]);

  const messages = useSelector(selectMessages);
  const gpt4 = useSelector(selectGPTMessages);

  useEffect(() => {
    initializeSocket(user.user.id);
    if (messages.length === 0) {
      const newMsg = {
        type: "join",
        user: user.user.email,
      };
      dispatch(sendMessage(newMsg));
    }

    return () => {};
  }, []);

  useEffect(() => {
    const newSocket = getSocket();
    if (newSocket && RoomJoined) {
      newSocket.emit("join-room", roomID.id, user.user.email);

      newSocket.on("user-joined", (users) => {
        const newMsg = {
          type: "join",
          user: users,
        };
        dispatch(sendMessage(newMsg));
        socket.emit("toggle-mic", user.user.email, micState, roomID);
      });

      newSocket.on("user-left", (user) => {
        const newMsg = {
          type: "left",
          user: user,
        };
        dispatch(sendMessage(newMsg));
        console.log("user left message dispatched in client");
      });

      newSocket.on("recieve-message", (message) => {
        console.log("in recieve message of fe");
        const newMsg = {
          type: "recieved",
          user: message.user,
          content: message.content,
          file:message.file
        };
        dispatch(sendMessage(newMsg));
      });

      newSocket.on("Mute-User", (user) => {
        const newMsg = {
          type: "muted",
          user: user,
        };
        dispatch(sendMessage(newMsg));
        //handle mute situation here
      });
      newSocket.on("Kick-User", (username) => {
        const newMsg = {
          type: "kicked",
          user: username,
        };
        dispatch(sendMessage(newMsg));

        if (username === user.user.email) {
          if (status === "fulfilled") {
            const newSocket = getSocket();
            //newSocket.emit("leave-room", user.user.email, roomID.id);
            destroySocket();
            const RoomDetail = {
              id: roomID,
              user_: user.user.id,
            };
            dispatch(LeaveRoom(RoomDetail));
            // dispatch(LeaveStream());
            dispatch(emptyMessages());
            dispatch(emptygptMessages());
            dispatch(SetCreator(false));
            dispatch(SetModerator(false));
            if (status === "fulfilled") {
              toast.error(`You have been kicked out.`, {
                position: "bottom-right",
                autoClose: 2000,
                hideProgressBar: true,
                closeOnClick: true,
                pauseOnHover: true,
                draggable: true,
                progress: undefined,
                theme: "colored",
              });
              navigate("/home");
            }
          }
        }
      });
      newSocket.on("Ban-User", (username) => {
        const newMsg = {
          type: "banned",
          user: username,
        };

        dispatch(sendMessage(newMsg));

        if (username === user.user.email) {
          if (status === "fulfilled") {
            const newSocket = getSocket();
            //newSocket.emit("leave-room", user.user.email, roomID.id);
            destroySocket();
            const RoomDetail = {
              id: roomID,
              user_: user.user.id,
            };
            dispatch(BanUser(RoomDetail));
            dispatch(LeaveRoom(RoomDetail));
            // dispatch(LeaveStream());

            dispatch(emptyMessages());
            dispatch(emptygptMessages());
            dispatch(SetCreator(false));
            dispatch(SetModerator(false));
            if (status === "fulfilled") {
              toast.error(`You have been banned from the room.`, {
                position: "bottom-right",
                autoClose: 2000,
                hideProgressBar: true,
                closeOnClick: true,
                pauseOnHover: true,
                draggable: true,
                progress: undefined,
                theme: "colored",
              });
              navigate("/home");
            }
          }
        }
      });
      newSocket.on("Make-Moderator", (username,userID) => {
        
        if (username === user.user.email) {
          if (status === "fulfilled") {
          
              dispatch(SetModerator(true));
              if (status === "fulfilled") {
                toast.success(`You are a moderator now.`, {
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
          }
      });
      newSocket.on("Remove-Moderator", (username,userID) => {
        
        if (username === user.user.email) {
          if (status === "fulfilled") {             
              dispatch(SetModerator(false));
              if (status === "fulfilled") {
                toast.error(`You have been dismissed as a moderator.`, {
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
        }
      });
      socket.on("Toggle-Mic", (users, micstate) => {
        if (users === user.user.email) {
          dispatch(toggleMic());
          setMicMute(!micMute);
          toast.error(`Your mic was toggled!`, {
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
      });
    }
  }, [getSocket, status, RoomJoined]);

  const handleEndCall = async () => {
    if (status === "fulfilled") {
      const newSocket = getSocket();
      newSocket.emit("leave-room", user.user.email, roomID.id);
      console.log("leave room emitted");
      destroySocket();
      const RoomDetail = {
        id: roomID,
        user_: user.user.id,
      };
      await dispatch(LeaveRoom(RoomDetail));
      // dispatch(LeaveStream());
      dispatch(emptyMessages());
      dispatch(emptygptMessages());
      dispatch(SetCreator(false));
      dispatch(SetModerator(false));
      if (status === "fulfilled") {
        navigate("/home");
      }
    }
  };

  const HandleMicClick = () => {
    dispatch(toggleMic());
    setMicMute(!micMute);
  };
  useEffect(() => {
    if (socket) {
      const socket = getSocket();
      socket.emit("toggle-mic", user.user.email, micState, roomID);
    }
  }, [socket, micState]);
  const HandleVideoClick = () => {
    dispatch(toggleCamera());
    setVideoOff(!isVideoOff);
  };

  return (
    <>
      {
        (Loading)&& <LoadingScreen
        loading={true}
        bgColor='black'
        spinnerColor='white'
        textColor='white'
        text='Joining Room...'
      > 
      
      </LoadingScreen>
      }
      {status === "loading" && (
        <div className="min-h-screen bg-Auth-0">
          <Navbar></Navbar>

          <div className="flex items-center justify-center">
            <PacmanLoader color="#435334" />
          </div>
        </div>
      )}
      {!Expired && status === "fulfilled" && RoomJoined && (
        <>
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
              <div className="w-1/3 h-12 mb-0 p-6 flex items-center">
                <p className="lg:text-lg md:text-sm text-xs  font-bold ">
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
              {users.length > 0 ? <VideoBox user={users}></VideoBox> : null}
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
                {micState === false && (
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
                {micState === true && (
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
              <Link className="flex items-center rounded-lg bg-red-900 text-white hover:scale-105 px-4 ml-2" to={`/whiteboard/${roomID.id}`}>Whitebord</Link>
            </div>
          </div>
        </>
      )}
      {status === "error" && <RoomNotFound></RoomNotFound>}
      {Expired && <TimeUp />}
    </>
  );
}
export default RoomPage;

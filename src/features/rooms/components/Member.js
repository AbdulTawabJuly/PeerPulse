
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
function Member({username,micstate}){
    
    const isCreator=useSelector(selectIsCreator);
    const user = useSelector(selectLoggedInUser);
    const {getSocket}=useSocket();
    const socket=getSocket();
    const RoomID=useParams();
    const dispatch=useDispatch();
    const MuteUser=(user)=>{
      socket.emit("toggle-mic",user,micstate,RoomID);
    }
    const KickUser=(user)=>{
        const newMessage={
            type:"kicked",
            user:user,
        }  
        
        dispatch(sendMessage(newMessage));
        socket.emit("kick-user",user,RoomID);
    }
    const BanUser=(user)=>{
        const newMessage={
            type:"banned",
            user:user,
        }  
        
        dispatch(sendMessage(newMessage));
        socket.emit("ban-user",user,RoomID);
    }
    

   return (
    <div className="flex flex-row items-center p-3 px-0 w-full border-b border-gray-600">
        <img  className="w-10 h-10 border border-black rounded-full mx-3" src="../profile.png" alt="img"></img>
        <p>{username}</p>
        {isCreator&&username!==user.user.email&&
        <div className="pt-2 pr-4 flex flex-row w-full justify-end">
             {micstate===false&&<svg xmlns="http://www.w3.org/2000/svg" onClick={()=>MuteUser(username)} width="20" height="20" fill="grey" className="bi bi-mic-mute-fill hover:cursor-pointer hover:opacity-60 mr-1" viewBox="0 0 16 16">
                  <path d="M13 8c0 .564-.094 1.107-.266 1.613l-.814-.814A4.02 4.02 0 0 0 12 8V7a.5.5 0 0 1 1 0v1zm-5 4c.818 0 1.578-.245 2.212-.667l.718.719a4.973 4.973 0 0 1-2.43.923V15h3a.5.5 0 0 1 0 1h-7a.5.5 0 0 1 0-1h3v-2.025A5 5 0 0 1 3 8V7a.5.5 0 0 1 1 0v1a4 4 0 0 0 4 4zm3-9v4.879L5.158 2.037A3.001 3.001 0 0 1 11 3z" />
                  <path d="M9.486 10.607 5 6.12V8a3 3 0 0 0 4.486 2.607zm-7.84-9.253 12 12 .708-.708-12-12-.708.708z" />
            </svg>}

            {micstate===true&& <svg
                  xmlns="http://www.w3.org/2000/svg"
                  width="20"
                  height="20"
                  fill="grey"
                  className="bi bi-mic-fill hover:cursor-pointer hover:opacity-60 mr-1"
                  viewBox="0 0 16 16"
                  onClick={()=>MuteUser(username)}
                >
                  {" "}
                  <path d="M5 3a3 3 0 0 1 6 0v5a3 3 0 0 1-6 0V3z" />{" "}
                  <path d="M3.5 6.5A.5.5 0 0 1 4 7v1a4 4 0 0 0 8 0V7a.5.5 0 0 1 1 0v1a5 5 0 0 1-4.5 4.975V15h3a.5.5 0 0 1 0 1h-7a.5.5 0 0 1 0-1h3v-2.025A5 5 0 0 1 3 8V7a.5.5 0 0 1 .5-.5z" />{" "}
                </svg>}
           <svg className="hover:cursor-pointer hover:opacity-60" onClick={()=>BanUser(username)} xmlns="http://www.w3.org/2000/svg" viewBox="0 0 30 30" width="24" height="24" fill="none" stroke="grey" stroke-width="2" stroke-linecap="round" stroke-linejoin="round">
             <circle cx="12" cy="12" r="10" />
             <line x1="5.63" y1="5.63" x2="18.37" y2="18.37" />
           </svg> 
           <svg className="pb-0.5 hover:cursor-pointer hover:opacity-60" onClick={()=>KickUser(username)} viewBox="0 0 1124 1124" xmlns="http://www.w3.org/2000/svg" width="24" height="24">
              <path fill="grey"  d="M512 64a448 448 0 1 1 0 896 448 448 0 0 1 0-896zM288 512a38.4 38.4 0 0 0 38.4 38.4h371.2a38.4 38.4 0 0 0 0-76.8H326.4A38.4 38.4 0 0 0 288 512z"/>
           </svg>
          
        </div>
       
}
    </div>
   )
}
export default Member;
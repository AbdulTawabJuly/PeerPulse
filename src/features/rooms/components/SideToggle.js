import { useEffect, useState } from "react";
import {  useSelector } from "react-redux";
import { selectJoinedRoom } from "../RoomSlice";
import Member from "./Member"
function SideToggle() {
  const [Members, SetMembers] = useState(true);
  const [Chat, SetChat] = useState(false);
  const [ChatGpt, SetChatGpt] = useState(false);
  const JoinedRoom=useSelector(selectJoinedRoom);
  const memberList=JoinedRoom.members;
  const HandleMemberClick = () => {
    if(!Members){
    SetMembers(true);
    SetChat(false);
    SetChatGpt(false);
    }
  };
  const HandleChatClick = () => {
    if(!Chat){
    SetMembers(false);
    SetChat(true);
    SetChatGpt(false);
    }
  };
  const HandleChatGptClick = () => {
    if(!ChatGpt){
    SetMembers(false);
    SetChat(false);
    SetChatGpt(true);
    }
  };
 
  return (
    <div className="h-96 w-96 bg-white border border-gray-600  rounded-lg flex flex-row items-start lg:block md:block">
      <button
        onClick={() => HandleMemberClick()}
        className="p-3 w-1/3 bg-AuthBtn-0 rounded-tl-lg text-white hover:scale-105 border border-white"
      >
        Members
      </button>
      <button
        onClick={() =>HandleChatClick()}
        className="p-3 w-1/3 bg-AuthBtn-0 text-white hover:scale-105 border border-white"
      >
        Chat
      </button>
      <button
        onClick={()=>HandleChatGptClick()}
        className="p-3 w-1/3 bg-AuthBtn-0 rounded-tr-lg text-white hover:scale-105 border border-white"
      >
        ChatGPT
      </button>
      {Members && (<div class="max-h-80 overflow-y-auto">

      {memberList&&(memberList.map((member) => (
          <Member key={member._id} username={member.email} />
        )))}
      </div>)}
      {Chat && (<div>Chat</div>)}
      {ChatGpt&&(<div>ChatGpt</div>)}
    </div>
  );
}
export default SideToggle;

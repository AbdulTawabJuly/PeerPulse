
import VideoIcons from "./VideoIcons"
import { useSelector } from "react-redux";
import { selectJoinedRoom } from "../RoomSlice";
function VideoBox(){
    const JoinedRoom=useSelector(selectJoinedRoom);
  const memberList=JoinedRoom.members;
  memberList.slice(0,8);
    return(
       
        <div className="flex flex-wrap lg:w-7/12 md:w-8/12 w-full space-x-1 space-y-1 justify-center items-center">
         {memberList&&(memberList.map((member) => (
          <VideoIcons key={member._id} username={member.email} />
        )))} 
        </div>       
    )
}
export default VideoBox;
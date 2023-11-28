import { useState } from "react";

function Dashboard() {
    const [PersonalInfo,SetPersonalInfo]=useState(true);
    const [MyRooms,SetMyRooms]=useState(false);
    const HandlePersonalClick=()=>{
       SetPersonalInfo(true);
       SetMyRooms(false);
    }
    const HandleRoomClick=()=>{
       SetMyRooms(true);
       SetPersonalInfo(false);
    }
  return (
    <div className="w-screen h-screen flex flex-row text-black bg-Auth-0">
      <div className="w-1/4 flex flex-col h-screen items-center py-9 border-r border-black h-5/6 my-10">
        <img
          src="./Ameer.jpg"
          className="w-40 h-40 rounded-full my-5 mt-0 shadow-2xl ring-4 ring-offset-2 ring-AuthBtn-0 hover:opacity-90 hover:cursor-pointer"
        ></img>
        <svg
          xmlns="http://www.w3.org/2000/svg"
          width="30"
          height="30"
          viewBox="0 0 24 24"
          fill="white"
          stroke=""
          stroke-width="2"
          stroke-linecap="round"
          stroke-linejoin="round"
          className="feather feather-edit-2 bg-AuthBtn-0 rounded-full p-1 absolute top-56 hover:scale-105 hover:opacity-90 hover:cursor-pointer"
        >
          <path d="M17 3a2.828 2.828 0 1 1 4 4L7.5 20.5 2 22l1.5-5.5L17 3z"></path>
        </svg>
        <div className="mb-12">
          <p className="font-bold text-lg font-Raleway">Ameer Hamza</p>
        </div>
        <div className="w-full">
          <button className={PersonalInfo?"w-full h-14 text-white hover:opacity-70 bg-AuthBtn-0":"w-full h-14 hover:opacity-70"} onClick={()=>HandlePersonalClick()}>
            <p className="text-lg font-Raleway font-bold ">Personal Info</p>
          </button>

          <button className={MyRooms?"w-full h-14 text-white hover:opacity-70 bg-AuthBtn-0":"w-full h-14 hover:opacity-70"} onClick={()=>HandleRoomClick()}>
            <p className="text-lg font-Raleway">My Rooms</p>
          </button>
        </div>
      </div>
     {PersonalInfo&&
       <div className="w-3/4 h-full mx-10">
 <div className="w-full shadow-2xl rounded-lg mt-10">
   <h1 className="font-Raleway text-2xl font-bold my-8 bg-AuthBtn-0 rounded-t-lg py-3 pl-5 text-white">
     Personal Info:
   </h1>
   <div className="flex flex-col gap-2 p-5 pt-0">
     <p>
       <span className="font-bold">Username : </span>
       SugarDaddy123
     </p>
     <p>
       <span className="font-bold">Email : </span>
       GayLord123@gmail.com
     </p>
     <p>
       <span className="font-bold">Age : </span>
       None of your Concern
     </p>
     <p></p>
   </div>
 </div>
 <div className="w-full shadow-2xl rounded-lg mt-10">
   <h1 className="font-Raleway text-2xl font-bold my-8 bg-AuthBtn-0 rounded-t-lg py-3 pl-5 text-white">
     Education:
   </h1>
   <div className="flex flex-row gap-2 p-5 pt-0">
   <div className="flex-row p-5 pt-0 px-0 shadow-2xl rounded-lg flex items-center flex-col w-64">
        <p className="bg-AuthBtn-0 text-white rounded-t-lg p-2 w-full"><span className="font-bold">O/A Levels</span>(2017-)</p> 
        <p className="pt-2">Pornhub ltd., Lahore</p>
     </div>
     <div className="flex-row p-5 pt-0 px-0 shadow-2xl rounded-lg flex items-center flex-col w-64">
        <p className="bg-AuthBtn-0 text-white rounded-t-lg p-2 w-full"><span className="font-bold">BS Computer Science</span>(2021-)</p> 
        <p className="pt-2">Fast Nuces, Lahore</p>
     </div>
   </div>
 </div>
       </div>
     }
     {
        MyRooms&&<div></div>
     }
    
     
    </div>
  );
}
export default Dashboard;

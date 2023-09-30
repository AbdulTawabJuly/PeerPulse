import { PacmanLoader } from "react-spinners";

import Navbar from "../features/Navbar/Navbar";
import { selectLoggedInUser, selectStatus } from "../features/auth/authSlice";
import {  useSelector } from "react-redux";
import { useState } from "react";
import { useEffect } from "react";
import axios from "axios";
import RoomCard from "../features/rooms/components/RoomCard";
import SideBar from "../features/rooms/components/sideBar";
import AddRoom from '../features/rooms/components/AddRoom';
import JoinPrivateRoom from "../features/rooms/components/JoinPrivateRoom";
import { Navigate } from "react-router-dom";



function HomePage() {
  const user = useSelector(selectLoggedInUser);
  const status = useSelector(selectStatus);
  const [searchedItem, setSearchedItem] = useState("");
  const [rooms, SetRooms] = useState([]);
  const [searchResult,SetSearchResults]=useState(false);
  


  const SearchRooms = async (name) => {
    try {
      const response = await axios.get(
        "http://localhost:8080/api/room/search",
        {
          params: {
            RoomName: name,
          },
        }
      );
      const result = response.data;
      SetRooms(result);
      SetSearchResults(false);
      if(result.length==0)
      {
        console.log('No Results');
        SetSearchResults(true);
      }
    } catch (err) {
      console.log(err);
    }
  };

  useEffect(() => {
    SearchRooms(searchedItem);
  }, [searchedItem]);

  return (
    
    <div className=" min-h-screen bg-Auth-0">
     
      <Navbar></Navbar>

      <SideBar/>

      <div className=" flex justify-end mr-3 mt-2">
        <div class="relative">
          <div class="absolute inset-y-0 left-0 flex items-center pl-3 pointer-events-none">
            <svg
              class="w-4 h-4 text-gray-500 "
              aria-hidden="true"
              xmlns="http://www.w3.org/2000/svg"
              fill="none"
              viewBox="0 0 20 20"
            >
              <path
                stroke="currentColor"
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth="2"
                d="m19 19-4-4m0-7A7 7 0 1 1 1 8a7 7 0 0 1 14 0Z"
              />
            </svg>
          </div>
          <input
            className="block w-full p-4 pl-10 text-sm text-gray-900 border border-gray-300 rounded-lg "
            placeholder=" Search Rooms"
            value={searchedItem}
            onChange={(e) => setSearchedItem(e.target.value)}
            type="search"
            id="default-search"
            required
          ></input>
        </div>
      </div>
      <p className="border-b font-mono divide-x-2 w-28 h-10 mx-20 font-bold text-3xl border-AuthBtn-0 text-gray-800">Rooms</p>
      <div className="flex flex-wrap mt-6 mx-16">
        {rooms.map((room) => (
          <RoomCard key={room.id} RoomDetails={room} />
        ))}
      </div>
      {searchResult&&(
      <div className="flex justify-center items-center h-72">
          <div className="p-6">
               <p>No Results found</p>
         </div>
     </div>
     )
     }
      <JoinPrivateRoom/>
      <AddRoom/>
      
      

      {/* <h1 className="text-center text-4xl text-black font-Logo">Home</h1>
      <br />
      <div className="flex justify-center items-center">
        {status === "loading" ? (
          <PacmanLoader color="#435334"/>
        ) : null}
      </div>
      {user.user.email && <div className=" text-4xl">{user.user.email}</div>} */}
    </div>
  );
}

export default HomePage;

import { PacmanLoader } from "react-spinners";

import Navbar from "../features/Navbar/Navbar";
import { selectLoggedInUser } from "../features/auth/authSlice";
import { SearchSuggRooms, selectStatus, selectsuggestedRooms, selectsuggestedRoomsError } from "../features/rooms/RoomSlice";
import { selectSearchedRooms } from "../features/rooms/RoomSlice";
import { searchRoom } from "../features/rooms/RoomSlice";
import { useDispatch, useSelector } from "react-redux";
import { useState } from "react";
import { useEffect } from "react";
import RoomCard from "../features/rooms/components/RoomCard";
import SideBar from "../features/rooms/components/sideBar";
import AddRoom from '../features/rooms/components/AddRoom';
import JoinPrivateRoom from "../features/rooms/components/JoinPrivateRoom";
import { useSocket } from '../context/socket';
import { Link } from "react-router-dom";

function HomePage() {
  const user = useSelector(selectLoggedInUser);
  const status = useSelector(selectStatus);
  const [searchedItem, setSearchedItem] = useState("");
  const searchedRooms = useSelector(selectSearchedRooms);
  const dispatch = useDispatch();
  const SearchRooms = async (name) => {
    dispatch(searchRoom(name));
  };
  const suggestedrooms = useSelector(selectsuggestedRooms);
  const suggestedroomserror = useSelector(selectsuggestedRoomsError);
  const SearchSuggestedRooms = async (user) => {
    await dispatch(SearchSuggRooms(user));
  }

  useEffect(() => {
    SearchRooms(searchedItem);
  }, [searchedItem]);
  useEffect(() => {
    SearchSuggestedRooms(user.user.id);
  }, [])
  useEffect(() => {
    console.log(suggestedrooms);
  }, [suggestedrooms])

  const settings = {
    dots: true,
    infinite: false,
    slidesToShow: 1,
    slidesToScroll: 0,
  };
  return (

    <div className=" min-h-screen bg-Primary-0">

      <Navbar></Navbar>

      <SideBar />
      {searchedRooms && (
        <>
          <div className=" flex justify-end mr-3 mt-2">
            <div className="relative">
              <div className="absolute inset-y-0 left-0 flex items-center pl-3 pointer-events-none">
                <svg
                  className="w-4 h-4 text-gray-500 "
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
              <div className="flex gap-4 pt-4">
                <input
                  className="block w-full p-4 pl-10 text-sm text-gray-900 border border-gray-300 rounded-lg "
                  placeholder=" Search Rooms"
                  value={searchedItem}
                  onChange={(e) => setSearchedItem(e.target.value)}
                  type="search"
                  id="default-search"
                  required
                ></input>
                <Link className="flex items-center bg-Secondary-0 text-white px-4 rounded-full text-sm" style={{ marginRight: '1%' }} to="/library">Resources</Link>
              </div>


            </div>
          </div>
          {suggestedrooms && suggestedrooms.length > 0 &&
            <>
              <p className="border-b font-Raleway divide-x-2 w-56 h-10 mx-20 font-bold text-2xl border-AuthBtn-0 text-gray-800">Suggested Rooms</p>
              <div className="flex flex-wrap mt-6 mx-16 my-5">
                {suggestedrooms && (suggestedrooms.map((room) => (
                  <RoomCard key={room.id} RoomDetails={room} />
                )))}
              </div>
            </>
          }
          <div className="flex justify-between mt-4">
            {
              searchedRooms &&
              <p className="border-b font-Raleway divide-x-2 w-24 h-10 mx-20 font-bold text-2xl border-AuthBtn-0 text-gray-800">Rooms</p>
            }
          </div>

          <div className="flex flex-wrap mt-6 mx-16 pb-20">

            {searchedRooms && (searchedRooms.filter(room => !suggestedrooms?.some(suggestedrooms => suggestedrooms?._id === room._id))
              .map((room) => (
                <RoomCard key={room.id} RoomDetails={room} />
              )))}
          </div>
          {!searchedRooms.length && (
            <div className="flex justify-center items-center h-72">
              <div className="p-6">
                <p>No Results found</p>
              </div>
            </div>
          )
          }
          <JoinPrivateRoom />
          <AddRoom />

        </>
      )}

      {status === "loading" && (
        <div className="flex items-center justify-center w-full h-0">
          <PacmanLoader color="#435334" />
        </div>
      )
      }
    </div>
  );
}

export default HomePage;

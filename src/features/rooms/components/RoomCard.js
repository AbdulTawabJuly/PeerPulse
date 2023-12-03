import React from "react";
import { useState, useEffect } from "react";
import { Link, useNavigate } from "react-router-dom";
import { selectLoggedInUser } from "../../auth/authSlice";
import { useSelector, useDispatch } from "react-redux";
import { sendMessage, selectMessages } from "../../chat/ChatSlice";
import PaymentPage from "../../../pages/PaymentPage";

function RoomCard({ RoomDetails }) {
  const givenDate = new Date(RoomDetails.startingTime);
  const isPaid = RoomDetails.isPaid;
  const currentTime = Date.now();
  const timePassed = currentTime - givenDate.getTime();
  const [timeLeft, setTimeLeft] = useState(
    Math.floor(60 - timePassed / (1000 * 60))
  );
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const user = useSelector(selectLoggedInUser);
  useEffect(() => {
    const intervalId = setInterval(() => {
      const givenDate = new Date(RoomDetails.startingTime);
      const currentTime = Date.now();
      const timePassed = currentTime - givenDate.getTime();
      const timeWeHave = Math.floor(60 - timePassed / (1000 * 60));

      if (timeWeHave < 0) {
        setTimeLeft("Expired");
      } else {
        setTimeLeft(timeWeHave + " mins");
      }
    }, 10);

    return () => clearInterval(intervalId);
  }, [RoomDetails]);
  const roomNavigation = "/room/" + RoomDetails._id;
  const joinRoom = async () => {
    const msg = {
      type: "join",
      user: user.user.email,
    };
    dispatch(sendMessage(msg));
    navigate(roomNavigation);
  };
  const handleProfileClick=(e)=>{
    e.stopPropagation();
    navigate("/profile/"+RoomDetails.createdBy._id);
  }

  //const handlePayment = () => {};

  return (
    <button onClick={() => (isPaid ? null : joinRoom())}>
      <div
        className={`m-2 w-64 h-36 flex flex-col ${
          isPaid ? " bg-red-300" : "bg-blue-200"
        } justify-between shadow-lg p-3 rounded-xl hover:scale-105 hover:shadow-xl hover:cursor-pointer" id="card`}
      >
        <div className="flex justify-around items-center">
          <p className="font-bold text-sm">{RoomDetails.name}</p>
          <p className="text-xs border px-2 border-black rounded-xl">
            {timeLeft}
          </p>
        </div>
        <div className="flex justify-between items-center">
          <span className="flex">
            <svg
              className="w-4 inline-block h-6"
              xmlns="http://www.w3.org/2000/svg"
              fill="none"
              viewBox="0 0 24 24"
              strokeWidth="1.5"
              stroke="currentColor"
              //className="w-6 h-6"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                d="M15.75 6a3.75 3.75 0 11-7.5 0 3.75 3.75 0 017.5 0zM4.501 20.118a7.5 7.5 0 0114.998 0A17.933 17.933 0 0112 21.75c-2.676 0-5.216-.584-7.499-1.632z"
              />
            </svg>
            <p className="text-sm">{RoomDetails.noOfMembers}</p>
          </span>
          {!isPaid && (
            <img
              onClick={(e)=>handleProfileClick(e)}
              className="w-7 h-7 border border-black rounded-full object-contain bg-black"
              src={RoomDetails?.createdBy?.image}
              alt="img"
            ></img>
          )}
          {isPaid && (
            <Link to="/Payment" state={RoomDetails}
            >
              <div className="flex justify-end">
                <button
                  // onClick={() => handlePayment()}
                  className=" bg-purple-400 hover:bg-purple-500 w-20 h-9 rounded"
                >
                  Pay
                </button>
              </div>
            </Link>
          )}
        </div>
      </div>
    </button>
  );
}

export default RoomCard;

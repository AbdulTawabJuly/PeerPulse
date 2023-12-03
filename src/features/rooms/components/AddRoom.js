//fuck github
import React, { useEffect, useState } from "react";
import axios from "axios";
import { selectLoggedInUser } from "../../auth/authSlice";
import { useSelector } from "react-redux";
import { useDispatch } from "react-redux";
import { createRoom, selectCreatedRoom, selectJoinedRoom, selectRoomError } from "../RoomSlice";
import { Navigate, useNavigate } from "react-router-dom";
const Modal = () => {
  const [isAddModalVisible, setAddModalVisible] = useState(false);
  const user = useSelector(selectLoggedInUser);
  const [newRoomName, setNewRoomName] = useState("");
  const [Amount, setAmount] = useState();
  const [PrivateCheck, setPrivateCheck] = useState(true);
  const [PaidCheck, setPaidCheck] = useState(false);
  const [roomCreated, setRoomCreated] = useState(false);
  const [Price, SetPrice] = useState();
  const RoomToJoin = useSelector(selectCreatedRoom);
  const[tagError,SetTagError]=useState("");
  const [newInterest, SetNewInterest] = useState("");
  const [providedInterests, SetProvidedInterests] = useState([
    "Software Development",
    "Data Science",
    "Web Development",
    "Artificial Intelligence (AI)",
    "Cybersecurity",
    "Entrepreneurship",
    "Project Management",
    "Financial Technology (FinTech)",
    "Digital Marketing",
    "Supply Chain Management",
    "Natural Language Processing",
    "Computer Vision",
    "Network Security",
    "Agile Methodology",
    "Logistics and Distribution",
  ]);

  const [userinterests, SetUserInterests] = useState([]);




  const toggleAddModal = () => {
    setAddModalVisible(!isAddModalVisible);
  };
  const dispatch = useDispatch();
  const error = useSelector(selectRoomError);
  const navigate = useNavigate();

  const CreateRoom = async (RoomName) => {
    if(userinterests.length===0){
        SetTagError('Please assosiate atleast one tag with the room.');
    }
    else if(userinterests.length>5){
        SetTagError('You can select a maximum of 5 tags.');

    }else{
    SetTagError('');
    const RoomDetails = {
      roomName: RoomName,
      priv: PrivateCheck,
      paid: PaidCheck,
      user_: user.user.id,
      price:Amount,
      tags:userinterests,
    };
    dispatch(createRoom(RoomDetails));
    setRoomCreated(true);
  }
  };



  const handleAddNewInterest = () => {
    SetUserInterests([...userinterests, newInterest]);
    SetProvidedInterests([...providedInterests, newInterest]);
    SetNewInterest((prevInterest) => "");
  };
  const handleKeyDown = (e) => {
    if (e.key === "Enter") {
      handleAddNewInterest();
    }
  };

  const pushInterest = (interest) => {
    const interestIndex = userinterests.indexOf(interest);

    if (interestIndex === -1) {
      // Add the interest to the array
      SetUserInterests([...userinterests, interest]);
    } else {
      // Remove the interest from the array
      const updatedInterests = [...userinterests];
      updatedInterests.splice(interestIndex, 1);
      SetUserInterests(updatedInterests);
    }
  };


  useEffect(() => {
    //PaidCheck !== true &&
    if ( roomCreated) {
      navigate("/room/" + RoomToJoin._id);
    }
  }, [RoomToJoin]);

  const handlePrivateCheck = () => {
    setPrivateCheck(!PrivateCheck);
  };
  const handlePaidCheck = () => {
    setPaidCheck(!PaidCheck);
  };
  //github
  return (
    <div>
      <button
        onClick={toggleAddModal}
        className="fixed bottom-10 right-10 block text-white bg-AuthBtn-0 focus:ring-4 focus:outline-none focus:ring-green-900 font-medium rounded-full text-sm p-4 text-center"
        type="button"
      >
        <svg
          className="w-6 h-6"
          fill="none"
          stroke="currentColor"
          viewBox="0 0 24 24"
          xmlns="http://www.w3.org/2000/svg"
        >
          <path
            strokeLinecap="round"
            strokeLinejoin="round"
            strokeWidth="2"
            d="M12 6v6m0 0v6m0-6h6m-6 0H6"
          />
        </svg>
      </button>

      {isAddModalVisible && (
        <div
          id="defaultModal"
          tabIndex="-1"
          aria-hidden="true"
          className="flex justify-end transition-all delay-1000 fixed bottom-8 right-14 z-50 mr-10 mb-10 overflow-x-auto overflow-y-auto"
        >
          <div className="relative md:w-1/2 lg:w-1/2 w-full max-w-full max-h-full">
            <div className="relative rounded-lg shadow bg-AuthBtn-0">
              <div className="flex items-start justify-between p-4 border-b rounded-t dark:border-gray-600">
                <h3 className="text-xl font-semibold text-white">
                  Create Room
                </h3>
                <button
                  type="button"
                  className="text-gray-400 bg-transparent hover:bg-gray-200 hover:text-gray-900 rounded-lg text-sm w-8 h-8 ml-auto inline-flex justify-center items-center dark:hover:bg-gray-600 dark:hover:text-white"
                  onClick={() => setAddModalVisible(false)}
                >
                  <svg
                    className="w-3 h-3"
                    aria-hidden="true"
                    xmlns="http://www.w3.org/2000/svg"
                    fill="none"
                    viewBox="0 0 14 14"
                  >
                    <path
                      stroke="currentColor"
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth="2"
                      d="m1 1 6 6m0 0 6 6M7 7l6-6M7 7l-6 6"
                    />
                  </svg>
                </button>
              </div>
              {error && (
                <div>
                  <span className="text-red-400 ml-6">{error.message}</span>
                </div>
              )}
              {
                tagError&&(
                  <div>
                    <span className="text-red-400 ml-6">{tagError}</span>
                  </div>
                )
              }
              <div className="p-10 pl-5 space-y-3">
                <div className="flex flex-row">
                  <input
                    className="block w-full mb-3  pl-6 ml-2 text-sm text-gray-900 border border-gray-300 rounded-l-lg "
                    placeholder=" Enter Name"
                    value={newRoomName}
                    onChange={(e) => setNewRoomName(e.target.value)}
                  ></input>
                  <button
                    className="rounded-r-lg  border border-white p-4 py-2 text-white  mb-3 hover:scale-105 hover:shadow-xl hover:cursor-pointer"
                    onClick={() => CreateRoom(newRoomName)}
                  >
                    Create
                  </button>
                </div>

                <div className="ml-2 flex flex-row ">
                  <input
                    type="checkbox"
                    checked={!PrivateCheck}
                    onChange={handlePrivateCheck}
                    className="rounded-fullform-checkbox text-gray-700 ml-2"
                  ></input>
                  <label className="ml-2 mr-4 text-white">Make Private </label>
                  <input
                    type="checkbox"
                    checked={PaidCheck}
                    onChange={handlePaidCheck}
                    className="rounded-fullform-checkbox text-gray-700 ml-2"
                  ></input>
                  <label className=" ml-2 text-white">Make Paid </label>

                </div>
                {PaidCheck && <div Name="flex justify-center">
                    <input
                      className="block w-full h-[40px]  mb-5  pl-6 ml-2 text-sm text-gray-900 border border-gray-300 rounded-lg"
                      placeholder="Enter Amount "
                      value={Amount}
                      onChange={(e) => setAmount(e.target.value)}
                    ></input>
                  </div>}

                  <div>
                    <div className="w-3/4 h-2/4 flex flex-wrap bg-white p-3 mx-10 rounded-lg ring ring-AuthBtn-0 ring-offset-1">
                      {providedInterests.map((interest) => (
                        <div
                          key={interest}
                          className={
                            userinterests.includes(interest)
                              ? "bg-AuthBtn-0 p-2 m-1 text-white border border-black rounded-lg text-[0.44rem] hover:cursor-pointer hover:opacity-70 inline bg-black"
                              : "bg-AuthBtn-0 p-2 m-1 text-white border border-black rounded-lg text-[0.44rem] hover:cursor-pointer hover:opacity-70 inline"
                          }
                          onClick={() => pushInterest(interest)}
                        >
                          {interest}
                          {!userinterests.includes(interest) ? (
                            <svg
                              className="w-3 h-3 inline ml-1"
                              fill="none"
                              stroke="currentColor"
                              viewBox="0 0 24 24"
                              xmlns="http://www.w3.org/2000/svg"
                            >
                              <path
                                strokeLinecap="round"
                                strokeLinejoin="round"
                                strokeWidth="2"
                                d="M12 6v6m0 0v6m0-6h6m-6 0H6"
                              />
                            </svg>
                          ) : null}
                        </div>
                      ))}
                      <div className="flex flex-row items-center w-full h-full mt-4">
                        <input
                          value={newInterest}
                          placeholder="Add new tags"
                          className=" pl-2 block w-full rounded-l-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6"
                          onChange={(e) => SetNewInterest(e.target.value)}
                          onKeyDown={handleKeyDown}
                        />
                        <button
                          type="button"
                          className="h-5/6 border-4 border-AuthBtn-0 bg-AuthBtn-0 rounded-r-md hover:opacity-70"
                          onClick={() => handleAddNewInterest()}
                        >
                          <svg
                            xmlns="http://www.w3.org/2000/svg"
                            viewBox="0 0 20 20"
                            fill="white"
                            className="w-7 h-7"
                          >
                            <path d="M3.105 2.289a.75.75 0 00-.826.95l1.414 4.925A1.5 1.5 0 005.135 9.25h6.115a.75.75 0 010 1.5H5.135a1.5 1.5 0 00-1.442 1.086l-1.414 4.926a.75.75 0 00.826.95 28.896 28.896 0 0015.293-7.154.75.75 0 000-1.115A28.897 28.897 0 003.105 2.289z" />
                          </svg>
                        </button>
                      </div>
                    </div>
                  </div>
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default Modal;

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

  const toggleAddModal = () => {
    setAddModalVisible(!isAddModalVisible);
  };
  const dispatch = useDispatch();
  const error = useSelector(selectRoomError);
  const navigate = useNavigate();

  const CreateRoom = async (RoomName) => {
    const RoomDetails = {
      roomName: RoomName,
      priv: PrivateCheck,
      paid: PaidCheck,
      user_: user.user.id,
      price:Amount,
    };
    dispatch(createRoom(RoomDetails));
    setRoomCreated(true);
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
          className="transition-all delay-1000 fixed bottom-12 right-16 mr-10 mb-10 z-50 overflow-x-hidden p-0 mr-0 overflow-y-auto"
        >
          <div className="relative w-full max-w-lg max-h-md">
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
                      className="block w-32 h-10  mb-3  pl-6 ml-1 text-sm text-gray-900 border border-gray-300 rounded-lg "
                      placeholder="Enter Amount "
                      value={Amount}
                      onChange={(e) => setAmount(e.target.value)}
                    ></input>
                  </div>}
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default Modal;

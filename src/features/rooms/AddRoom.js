import React, { useState } from "react";
import axios from "axios";
import { selectLoggedInUser } from "../auth/authSlice";
import { useSelector } from "react-redux";
const Modal = () => {
  const [isModalVisible, setModalVisible] = useState(false);  // Test
  const user = useSelector(selectLoggedInUser);
  const [newRoomName, setNewRoomName] = useState("");
  const [Check, setCheck] = useState(true);
  const [Response,SetResponse]=useState('');
  const toggleModal = () => {
    setModalVisible(!isModalVisible);
  };
  const CreateRoom = async (RoomName) => {
    try {
      const response = await axios.post(
        "http://localhost:8080/api/room/create",
        {
          Room: RoomName,
          currentUser: user.user.id,
          isPublic:Check
        }
      );
      SetResponse('');
      setNewRoomName("");

     
    } catch (err) {
      SetResponse(err.response.data.error);
    }
  };
  const handleCheck = () => {
    setCheck(!Check);
  };
  return (
    <div>
      <button
        onClick={toggleModal}
        className="fixed bottom-10 right-10 block text-white bg-AuthBtn-0 focus:ring-4 focus:outline-none focus:ring-gray-800 font-medium rounded-full text-sm px-5 py-2.5 text-center"
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

      {isModalVisible && (
        
        <div
          id="defaultModal"
          tabIndex="-1"
          aria-hidden="true"
          className="transition-all delay-1000 fixed bottom-12 right-16 mr-5 mb-10 z-50 overflow-x-hidden p-0 mr-0 overflow-y-auto"
        >
          <div class="relative w-full max-w-lg max-h-md">
            <div className="relative bg-white rounded-lg shadow dark:bg-AuthBtn-0">
              <div className="flex items-start justify-between p-4 border-b rounded-t dark:border-gray-600">
                <h3 className="text-xl font-semibold text-gray-900 dark:text-white">
                  Create Room
                </h3>
                <button
                  type="button"
                  className="text-gray-400 bg-transparent hover:bg-gray-200 hover:text-gray-900 rounded-lg text-sm w-8 h-8 ml-auto inline-flex justify-center items-center dark:hover:bg-gray-600 dark:hover:text-white"
                  onClick={() => setModalVisible(false)}
                >
                  <svg
                    class="w-3 h-3"
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
              {Response&&(
              <div>
                <span className="text-red-400 ml-6">{Response}</span>
              </div>
              )
            }
              <div className="p-10 pl-5 space-y-3">
                  <input
                    className="block w-full p-2 pl-6 ml-2 text-sm text-gray-900 border border-gray-300 rounded-lg "
                    placeholder=" Enter Name"
                    value={newRoomName}
                    onChange={(e) => setNewRoomName(e.target.value)}
                  ></input>
                 
                <div className="flex flex-row ">
                  
                  <input
                    type="checkbox"
                    checked={!Check}
                    onChange={handleCheck}
                    className="rounded-fullform-checkbox text-gray-700 ml-2"
                  ></input>
                    <label className="mt-4 ml-4 text-white">Make Private </label>
               
                  <button
                    className="rounded-full border border-white p-4 py-2 text-white ml-16 mt-4 hover:scale-105 hover:shadow-xl hover:cursor-pointer"
                    onClick={() => CreateRoom(newRoomName)}
                  >
                    Create
                  </button>

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

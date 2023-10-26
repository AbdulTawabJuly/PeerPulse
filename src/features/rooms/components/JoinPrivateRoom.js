import { useState } from "react";
import { Navigate } from "react-router-dom";
import { Link } from "react-router-dom";
function JoinPrivateRoom(){
  const [isLockModalVisible,setLockModalVisible]=useState(false);
  const [PrivateRoomId,setPrivateRoomId]=useState('');
  const toggleLockModal = () => {
    setLockModalVisible(!isLockModalVisible);
  };

    return(
    
 <div>
      <button
        onClick={toggleLockModal}
        className="fixed bottom-20 mb-8  right-10 block text-white bg-AuthBtn-0 focus:ring-4 focus:outline-none focus:ring-green-900 font-medium rounded-full text-sm p-5 text-center"
        type="button"
      >
       <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="currentColor" class="bi bi-lock" viewBox="0 0 16 16"> <path d="M8 1a2 2 0 0 1 2 2v4H6V3a2 2 0 0 1 2-2zm3 6V3a3 3 0 0 0-6 0v4a2 2 0 0 0-2 2v5a2 2 0 0 0 2 2h6a2 2 0 0 0 2-2V9a2 2 0 0 0-2-2zM5 8h6a1 1 0 0 1 1 1v5a1 1 0 0 1-1 1H5a1 1 0 0 1-1-1V9a1 1 0 0 1 1-1z"/> </svg>
      </button>

      {isLockModalVisible && (
        <div
          id="defaultModal"
          tabIndex="-1"
          aria-hidden="true"
          className="transition-all delay-1000 fixed bottom-20 right-14 mr-10 mb-20 z-50 overflow-x-hidden p-0 mr-0 overflow-y-auto"
        >
          <div className="relative w-full max-w-lg max-h-md">
            <div className="relative bg-white rounded-lg shadow dark:bg-AuthBtn-0">
              <div className="flex items-start justify-between p-4 border-b rounded-t dark:border-gray-600">
                <h3 className="text-xl font-semibold text-gray-900 dark:text-white">
                  Join Private Room
                </h3>
                <button
                  type="button"
                  className="text-gray-400 bg-transparent hover:bg-gray-200 hover:text-gray-900 rounded-lg text-sm w-8 h-8 ml-auto inline-flex justify-center items-center dark:hover:bg-gray-600 dark:hover:text-white"
                  onClick={() => setLockModalVisible(false)}
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
              {Response && (
                <div>
                  <span className="text-red-400 ml-6">{Response}</span>
                </div>
              )}
              <div className="p-5 px-10 pl-9 pb-14 flex flex-row">
                <input
                  className="block w-full p-2 pl-3 text-sm text-gray-900 border border-gray-300 rounded-l-lg "
                  placeholder=" Enter Private Room ID"
                  value={PrivateRoomId}
                  onChange={(e) => setPrivateRoomId(e.target.value)}
                ></input>

                
                 <Link to={"/room/"+PrivateRoomId}>
                  <button
                    className="rounded-r-lg  border border-white p-4 py-2 text-white hover:scale-105 hover:shadow-xl hover:cursor-pointer"    
                  >
                    Join
                  </button>
                </Link>

                
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
        
    )
}
export default JoinPrivateRoom;
import { useState, useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useParams } from "react-router-dom";
import { removeFriendAsync, blockFriendAsync } from "../features/friends/friendSlice";
import { setErrorToNull, setLoadingToNull, selectStatus as selectFStatus } from "../features/friends/friendSlice";
import MoonLoader from "react-spinners/MoonLoader";
import {
  UpdateUserInfo,
  getUser,
  selectErrors,
  selectGetUser,
  selectGetUserError,
  selectLoggedInUser,
  selectStatus,
  selectUpdateError,
} from "../features/auth/authSlice";
import Navbar from "../features/Navbar/Navbar";
import { PacmanLoader } from "react-spinners";
import RoomNotFound from "./RoomNotFound";
import UserNotFound from "./UserNotFound";
import validator from "validator";
import { GetRoomsofUser, selectProfileRooms, selectProfileRoomsError } from "../features/rooms/RoomSlice";
import RoomCard from "../features/rooms/components/RoomCard";
function Dashboard() {
  const [PersonalInfo, SetPersonalInfo] = useState(true);
  const [MyRooms, SetMyRooms] = useState(false);
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
  const [name, SetName] = useState("");
  const [username, SetUsername] = useState("");
  const [email, SetEmail] = useState("");
  const [age, SetAge] = useState();
  const [bsUni, SetBSUni] = useState("");
  const [bsField, SetBSField] = useState("");
  const [msUni, SetMSUni] = useState("");
  const [msField, SetMSField] = useState("");
  const [postImage, SetPostImage] = useState("");
  const [FormErrors, SetFormErrors] = useState("");
  const userID = useParams();
  const usertoShow = useSelector(selectGetUser);
  const error = useSelector(selectErrors);
  const getusererror=useSelector(selectGetUserError);
  const updateusererror=useSelector(selectUpdateError);
  const status = useSelector(selectStatus);
  const fStatus = useSelector(selectFStatus);
  const rooms=useSelector(selectProfileRooms);
  const roomsError=useSelector(selectProfileRoomsError);

  const user = useSelector(selectLoggedInUser);
  const dispatch = useDispatch();
  const HandlePersonalClick = () => {
    SetPersonalInfo(true);
    SetMyRooms(false);
  };
  const HandleRoomClick = async() => {
    SetMyRooms(true);
    SetPersonalInfo(false);
    await dispatch(GetRoomsofUser(userID.id));
    console.log(rooms);
    console.log(roomsError);
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
    if (userID.id) {
      const data = {
        id: userID.id,
      };
      dispatch(getUser(data));
    }
  }, [userID]);
  useEffect(() => {
    if (usertoShow) {
      SetUserInterests(usertoShow.interest);
      const setUnion = new Set([...providedInterests, ...usertoShow.interest]);
      const unionarray = [...setUnion];
      SetProvidedInterests(unionarray);
      SetAge(usertoShow.age);
      SetName(usertoShow.name);
      SetUsername(usertoShow.username);
      SetEmail(usertoShow.email);
      SetBSField(usertoShow.bsField);
      SetBSUni(usertoShow.bsUni);
      SetMSField(usertoShow.msUni);
      SetMSUni(usertoShow.msUni);
    }
  }, [usertoShow]);

  const HandleUpdateInfo = async () => {
    if (!(email && validator.isEmail(email))) {
      SetFormErrors("Enter a valid Email");
    }
    else if (!age) {
      SetFormErrors("Age is Required");
    } else if (!username) {
      SetFormErrors("Username is required");
    } else if (!name) {
      SetFormErrors("Name is required");
    } else if (userinterests.length === 0) {
      SetFormErrors("Please select atleast 1 interest");
    } else if (userinterests.length > 5) {
      SetFormErrors("You can select 5 interests at max.");
    } else {
      SetFormErrors("");
      const data = {
        id: user.user.id,
        name: name,
        age: age,
        email: email,
        username: username,
        bsField: bsField,
        bsUni: bsUni,
        msField: msField,
        msUni: msUni,
        interest: userinterests,
      }
      await dispatch(UpdateUserInfo(data));
    }
  }

  const handleRemove = async () => {
    const data = {
      user: user.user.username,
      friend: usertoShow.username
    }

    dispatch(removeFriendAsync(data));
    dispatch(setErrorToNull());
    dispatch(setLoadingToNull());

  }

  const handleBlock = async () => {
    const data = {
      user: user.user.username,
      friend: usertoShow.username
    }

    dispatch(blockFriendAsync(data));
    dispatch(setErrorToNull());
    dispatch(setLoadingToNull());
    
  }


  return (
    <>
      {user && <Navbar />}
      {status === "loading" && (
        <div className="flex items-center justify-center w-full h-0">
          <PacmanLoader color="#435334" />
        </div>
      )}

      {usertoShow && status === "fulfilled" && (
        <div className="w-full h-full flex flex-row text-black bg-Auth-0">

          <div className="w-1/4 flex flex-col items-center py-9 border-r border-black h-[rem1] my-10 pb-20">
            <img
              src={usertoShow.image}
              className="w-40 h-40 object-contain bg-white rounded-full my-5 mt-0 shadow-2xl ring-4 ring-offset-2 ring-AuthBtn-0 hover:opacity-90 hover:cursor-pointer"
            ></img>
            {(user && (user.user.id === userID.id)) &&
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
                className="feather feather-edit-2 bg-AuthBtn-0 rounded-full p-1 absolute top-72 hover:scale-105 hover:opacity-90 hover:cursor-pointer"
              >
                <path d="M17 3a2.828 2.828 0 1 1 4 4L7.5 20.5 2 22l1.5-5.5L17 3z"></path>
              </svg>
            }
            
            <div className="mb-4">
              {user && user.user.id === userID.id && (
                <div className="w-full text-center flex justify-center items-center ">
                  <input
                    className="block w-full text-center font-bold text-2xl bg-Auth-0 rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-black sm:text-sm sm:leading-6 mt-4"
                    value={name}
                    onChange={(e) => SetName(e.target.value)}
                  />
                </div>
              )}
              {((user && user.user.id !== userID.id) || !user) && (
                <p className="font-bold text-lg font-Raleway">
                  {usertoShow.name}
                </p>
              )}
            </div>
            {
                (user && (user.user.id !== userID.id)) &&
                <div className="mb-4">
                  
                  <button className="bg-AuthBtn-0 p-2 rounded-lg text-white font-bold mx-2 border-1 border-black hover:opacity-70" onClick={() => handleBlock()}>
                    Block
                  </button>
                  <button className="bg-AuthBtn-0 p-2 rounded-lg text-white font-bold mx-2 border-1 border-black hover:opacity-70" onClick={() => handleRemove()}>
                    Remove
                  </button>
                </div>
              }
            <div className="w-full">
              <button
                className={
                  PersonalInfo
                    ? "w-full h-14 text-white hover:opacity-70 bg-AuthBtn-0"
                    : "w-full h-14 hover:opacity-70"
                }
                onClick={() => HandlePersonalClick()}
              >
                <p className="text-lg font-Raleway font-bold ">Personal Info</p>
              </button>

              <button
                className={
                  MyRooms
                    ? "w-full h-14 text-white hover:opacity-70 bg-AuthBtn-0"
                    : "w-full h-14 hover:opacity-70"
                }
                onClick={() => HandleRoomClick()}
              >
                <p className="text-lg font-Raleway">Rooms</p>
              </button>
            </div>
          </div>
          {PersonalInfo && (
            <div className="w-3/4 h-full mx-10 ">

              {
                (user && (user.user.id === userID.id)) &&

                <div className={FormErrors||updateusererror ? "w-full flex flex-row items-center justify-between" : "w-full flex justify-end"}>
                  {
                    user && FormErrors && <p className="text-red-500">{FormErrors}</p>         
                  }
                  {
                    updateusererror&&(updateusererror!=="Information updated successfully.")&&<p className="text-red-500 font-bold text-lg">{updateusererror.message}</p>
                  }
                  {
                    updateusererror==="Information updated successfully."&&<p className="text-green-800 font-bold text-lg">Information updated successfully.</p>
                  }
                  <button className="bg-AuthBtn-0 p-2 rounded-lg text-white font-bold mt-3 hover:opacity-70" onClick={() => HandleUpdateInfo()}>
                    Update Info
                  </button>
                </div>
              }
             
              <div className="w-full shadow-2xl rounded-lg">
                <h1 className="font-Raleway text-2xl font-bold my-8 bg-AuthBtn-0 rounded-t-lg py-3 pl-5 text-white">
                  Personal Info:
                </h1>
                <div className="flex flex-col gap-2 p-5 pt-0">
                  <p className="flex items-center">
                    <span className="font-bold inline">Username : </span>
                    {user && user.user.id === userID.id && (
                      <div className="w-1/3 ml-2">
                        <input
                          className="inline-block w-full text-center text-2xl bg-Auth-0 rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-black sm:text-sm sm:leading-6"
                          value={username}
                          onChange={(e) => SetUsername(e.target.value)}
                        />
                      </div>
                    )}
                    {((user && user.user.id !== userID.id) || !user) && (
                      <p className="text-lg font-Raleway ml-2">
                        {usertoShow.username}
                      </p>
                    )}
                  </p>
                  <p className="flex items-center">
                    <span className="font-bold inline">Email : </span>
                    {user && user.user.id === userID.id && (
                      <div className="w-1/3 ml-3">
                        <input
                          className="ml-8 inline-block w-full text-center text-2xl bg-Auth-0 rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-black sm:text-sm sm:leading-6"
                          value={email}
                          onChange={(e) => SetEmail(e.target.value)}
                        />
                      </div>
                    )}
                    {((user && user.user.id !== userID.id) || !user) && (
                      <p className="text-lg font-Raleway ml-2">
                        {usertoShow.email}
                      </p>
                    )}
                  </p>
                  <p className="flex items-center">
                    <span className="font-bold inline">Age : </span>
                    {user && user.user.id === userID.id && (
                      <div className="w-1/3 ml-12">
                        <input
                          className="ml-1 inline-block w-full text-center text-2xl bg-Auth-0 rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-black sm:text-sm sm:leading-6"
                          value={age}
                          onChange={(e) => SetAge(e.target.value)}
                        />
                      </div>
                    )}
                    {((user && user.user.id !== userID.id) || !user) && (
                      <p className="text-lg font-Raleway ml-2">
                        {usertoShow.age}
                      </p>
                    )}
                  </p>
                </div>
              </div>
              <div className="w-full shadow-2xl rounded-lg mt-10">
                <h1 className="font-Raleway text-2xl font-bold my-8 bg-AuthBtn-0 rounded-t-lg py-3 pl-5 text-white">
                  Education:
                </h1>
                <div className="flex flex-row gap-2 p-5 pt-0">
                  {(usertoShow.bsField || usertoShow.bsUni) && (
                    <div className="flex-row p-5 pt-0 px-0 shadow-2xl rounded-lg flex items-center flex-col w-64">
                      <p className="bg-AuthBtn-0 text-white rounded-t-lg p-2 w-full flex items-center">
                        <span className="font-bold inline">
                          BS (
                          {user &&
                            user.user.id === userID.id &&
                            usertoShow.bsField && (
                              <div className="w-3/4 inline-block p-2">
                                <input
                                  className="inline-block w-full bg-AuthBtn-0 text-white text-center text-2xl bg-Auth-0 rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-black sm:text-sm sm:leading-6"
                                  value={bsField}
                                  onChange={(e) => SetBSField(e.target.value)}
                                />
                              </div>
                            )}
                          {((user && user.user.id !== userID.id) || !user) &&
                            usertoShow.bsField && (
                              <span className=" text-lg font-Raleway ml-2">
                                {usertoShow.bsField}
                              </span>
                            )}
                          )
                        </span>
                      </p>

                      <p className="pt-2">
                        {user &&
                          user.user.id === userID.id &&
                          usertoShow.bsUni && (
                            <div className=" inline-block p-2">
                              <input
                                className="inline-block w-full bg-Auth-0 text-black text-2xl text-center text-2xl bg-Auth-0 rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-black sm:text-sm sm:leading-6"
                                value={bsUni}
                                onChange={(e) => SetBSUni(e.target.value)}
                              />
                            </div>
                          )}
                        {((user && user.user.id !== userID.id) || !user) &&
                          usertoShow.bsUni && (
                            <span className=" text-lg font-Raleway ml-2">
                              {usertoShow.bsUni}
                            </span>
                          )}
                      </p>
                    </div>
                  )}
                  {(usertoShow.msField || usertoShow.msUni) && (
                    <div className="flex-row p-5 pt-0 px-0 shadow-2xl rounded-lg flex items-center flex-col w-64">
                      <p className="bg-AuthBtn-0 text-white rounded-t-lg p-2 w-full flex items-center">
                        <span className="font-bold inline">
                          BS (
                          {user &&
                            user.user.id === userID.id &&
                            usertoShow.msField && (
                              <div className="w-3/4 inline-block p-2">
                                <input
                                  className="inline-block w-full bg-AuthBtn-0 text-white text-center text-2xl bg-Auth-0 rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-black sm:text-sm sm:leading-6"
                                  value={msField}
                                  onChange={(e) => SetMSField(e.target.value)}
                                />
                              </div>
                            )}
                          {((user && user.user.id !== userID.id) || !user) &&
                            usertoShow.msField && (
                              <span className=" text-lg font-Raleway ml-2">
                                {usertoShow.msField}
                              </span>
                            )}
                          )
                        </span>
                      </p>

                      <p className="pt-2">
                        {user &&
                          user.user.id === userID.id &&
                          usertoShow.msUni && (
                            <div className=" inline-block p-2">
                              <input
                                className="inline-block w-full bg-Auth-0 text-black text-2xl text-center text-2xl bg-Auth-0 rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-black sm:text-sm sm:leading-6"
                                value={msUni}
                                onChange={(e) => SetMSUni(e.target.value)}
                              />
                            </div>
                          )}
                        {((user && user.user.id !== userID.id) || !user) &&
                          usertoShow.msUni && (
                            <span className=" text-lg font-Raleway ml-2">
                              {usertoShow.msUni}
                            </span>
                          )}
                      </p>
                    </div>
                  )}
                </div>
              </div>

              <div className="w-full h-full pb-1 mb-10 shadow-2xl rounded-lg mt-8">
                <h1 className="font-Raleway text-2xl font-bold my-8 bg-AuthBtn-0 rounded-t-lg py-3 pl-5 text-white">
                  Interests:
                </h1>
                {user && user.user.id === userID.id && (
                  <div>
                    <div className="w-1/2 h-2/4 flex flex-wrap bg-white p-3 mx-10 mb-10 rounded-lg ring ring-AuthBtn-0 ring-offset-1">
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
                      <div className="flex flex-row items-center w-full h-10 m-2 mt-4">
                        <input
                          value={newInterest}
                          placeholder="Add new interest"
                          className=" pl-2 block w-full rounded-l-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6"
                          onChange={(e) => SetNewInterest(e.target.value)}
                          onKeyDown={handleKeyDown}
                        />
                        <button
                          type="button"
                          className="h-5/6 border-4 border-AuthBtn-0 bg-AuthBtn-0 rounded-r-md w-1/12 hover:opacity-70"
                          onClick={() => handleAddNewInterest()}
                        >
                          <svg
                            xmlns="http://www.w3.org/2000/svg"
                            viewBox="0 0 20 20"
                            fill="white"
                          >
                            <path d="M3.105 2.289a.75.75 0 00-.826.95l1.414 4.925A1.5 1.5 0 005.135 9.25h6.115a.75.75 0 010 1.5H5.135a1.5 1.5 0 00-1.442 1.086l-1.414 4.926a.75.75 0 00.826.95 28.896 28.896 0 0015.293-7.154.75.75 0 000-1.115A28.897 28.897 0 003.105 2.289z" />
                          </svg>
                        </button>
                      </div>
                    </div>
                  </div>
                )}
                <div className="mb-7 ml-4">
                  {((user && user.user.id !== userID.id) || !user) &&

                    usertoShow.interest.map((interest, index) => (
                      <div
                        key={index}
                        className="bg-AuthBtn-0 w-full h-full p-2 m-1 text-white border border-black rounded-lg text-[1rem] hover:cursor-pointer hover:opacity-70 inline"
                      >
                        {interest}
                      </div>
                    ))

                  }
                </div>
              </div>

            </div>

          )}
          {MyRooms && 
          <div className="flex flex-wrap items-start m-10">
          {rooms &&
            rooms.map((room) => (
              <RoomCard key={room._id} RoomDetails={room} />
            ))}
        </div>
        
          }
        </div>
      )}
      {getusererror && <UserNotFound></UserNotFound>}
    </>
  );
}
export default Dashboard;

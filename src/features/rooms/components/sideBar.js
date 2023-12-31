import React, { useState, useEffect } from 'react';
import Friend from '../../friends/components/Friend';
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import { sendReqAsync, selectErrors, selectStatus, setErrorToNull, setLoadingToNull, setFriends, selectFriends } from '../../friends/friendSlice';
import { useSelector } from 'react-redux'
import { useDispatch } from 'react-redux'
import MoonLoader from "react-spinners/MoonLoader";
import { selectLoggedInUser } from "../../auth/authSlice";
import axios from 'axios'
import FriendContainer from '../../friends/components/FriendContainer';

const SideBar = () => {

   const [isDrawerOpen, setIsDrawerOpen] = useState(false);

   const toggleDrawer = () => {
      setIsDrawerOpen(!isDrawerOpen);
   };

   const LoggedInUser = useSelector(selectLoggedInUser);
   const errors = useSelector(selectErrors);
   const status = useSelector(selectStatus);

   const [friend, setFriend] = useState("");
   const dispatch = useDispatch();

   const fetchFriends = async () => {
      try {
         const response = await axios.get('http://localhost:8080/api/friend/getFriends', {
            params: {
               user_username: LoggedInUser.user.username
            }
         });
         dispatch(setFriends(response.data));

      } catch (error) {
         console.error('Error fetching notifications:', error);
      }
   };

   useEffect(() => {
      dispatch(setErrorToNull());
      dispatch(setLoadingToNull());
   }, [])

   const friends = useSelector(selectFriends);

   useEffect(() => {
      if (isDrawerOpen) {
         fetchFriends();
      }
   }, [isDrawerOpen])


   const sendReq = async () => {
      const user = {
         user: LoggedInUser.user.username,
         friend: friend,
      }

      dispatch(sendReqAsync(user));
      dispatch(setErrorToNull());
      dispatch(setLoadingToNull());
      setFriend('');
   }

   return (
      <>
         <button type="button" onClick={toggleDrawer} aria-controls="drawer-navigation" className="text-gray-400 bg-transparent hover:bg-gray-200 hover:text-gray-900 rounded-lg text-sm p-1.5 absolute top-3.5 left-3 inline-flex items-center dark:hover:bg-gray-600 dark:hover:text-white">
            <svg
               xmlns="http://www.w3.org/2000/svg"
               viewBox="0 0 24 24"
               fill="currentColor"
               className="w-6 h-6"
            >
               <path d="M0 0h24v24H0z" fill="none" />
               <path d="M4 6h16v2H4zm0 5h16v2H4zm0 5h16v2H4z" />
            </svg>

            <span className="sr-only">Close menu</span>
         </button>
         <div className={`fixed top-0 left-0 z-40 w-64 h-screen p-4 overflow-y-auto overflow-x-hidden transition-transform ${isDrawerOpen ? '' : '-translate-x-full'} bg-AuthBtn-0`} tabIndex="-1" aria-labelledby="drawer-navigation-label">
            <h5 id="drawer-navigation-label" className="mt-6 text-base font-semibold text-gray-500 uppercase dark:text-gray-400">Friend List</h5>
            <button type="button" onClick={toggleDrawer} aria-controls="drawer-navigation" className="text-gray-400 bg-transparent hover:bg-gray-200 hover:text-gray-900 rounded-lg text-sm p-1.5 absolute top-3 left-15 ml-48 inline-flex items-center dark:hover:bg-gray-600 dark:hover:text-white">
               <svg aria-hidden="true" className="w-5 h-5" fill="currentColor" viewBox="0 0 20 20" xmlns="http://www.w3.org/2000/svg"><path fillRule="evenodd" d="M4.293 4.293a1 1 0 011.414 0L10 8.586l4.293-4.293a1 1 0 111.414 1.414L11.414 10l4.293 4.293a1 1 0 01-1.414 1.414L10 11.414l-4.293 4.293a1 1 0 01-1.414-1.414L8.586 10 4.293 5.707a1 1 0 010-1.414z" clipRule="evenodd"></path></svg>
            </button>
            <div className='flex justify-between pt-6'>
               <input className=' rounded-full outline-none w-40 pl-2' onChange={(e) => setFriend(e.target.value)} value={friend} />
               <button className='rounded-full w-8 h-8 bg-white text-center' onClick={sendReq}>{status === "loading" ? (
                  <MoonLoader color="black" size={20} />
               ) : (
                  "+"
               )}</button>
            </div>
            <div>
               <div className="py-4 overflow-y-auto">
                  <div className='online'>
                     <div className='flex gap-3 text-white items-center py-4'>
                        <h3>{friend.name}</h3>
                        <div className='w-2 h-2 rounded-full bg-green-100'>
                        </div>
                     </div>
                     {friends.length !== 0 ? friends.map((x) => (
                        <Friend user={x} />
                     )): <h2 className='text-white text-center pt-5'>You have no friends. LOL</h2>}
                  </div>
               </div>
            </div>

         </div>
      </>
   );
};

export default SideBar;
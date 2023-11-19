import React from 'react'
import { useSelector } from 'react-redux'
import { useDispatch } from 'react-redux'
import { selectLoggedInUser } from "../../auth/authSlice";
import axios from 'axios'
import MoonLoader from "react-spinners/MoonLoader";
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import { addFriendAsync, declineReqAsync, selectErrors, selectStatus, setErrorToNull, setLoadingToNull } from '../friendSlice';
import { useEffect } from 'react';
import { setNotifications } from '../../auth/authSlice';


function Notification(notification) {
  

  const LoggedInUser = useSelector(selectLoggedInUser);

  const dispatch = useDispatch();

  useEffect(()=> {
    dispatch(setErrorToNull())
    dispatch(setLoadingToNull())
  },[])

  const status = useSelector(selectStatus)
  const errors = useSelector(selectErrors)

  useEffect(()=> {

    if(status === 'fulfilled')
      fetchNotifications();

  },[status,errors])

  const fetchNotifications = async () => {
    try {
      const response = await axios.get('http://localhost:8080/api/friend/getNotifications', {
        params: {
          username: LoggedInUser.user.username
        }
      });
     dispatch(setNotifications(response.data.messages));

    } catch (error) {
      console.error('Error fetching notifications:', error);
    }
  };

  const declineReq = async () => {
    const user = {
      user: LoggedInUser.user.username,
      friend: notification.notification.sender.username,
      notificationID: notification.notification._id
    }
    dispatch(declineReqAsync(user));
    dispatch(setErrorToNull());
    dispatch(setLoadingToNull());

  }

  const acceptReq = async () => {

    const user = {
      user: LoggedInUser.user.username,
      friend: notification.notification.sender.username,
      notificationID: notification.notification._id
    }

    dispatch(addFriendAsync(user));
    dispatch(setErrorToNull());
    dispatch(setLoadingToNull());

  }

  if (notification.notification.type === 'info') {
    return (
      <div className='block px-4 py-4 text-sm text-gray-700 border-b-2 border-gray-400'>
        <h3>content</h3>
      </div>
    )
  }
  else if (notification.notification.type === 'notification') {
    return (
      <div className='block px-4 py-4 text-sm text-gray-700 border-b-2 border-gray-400'>
        <div className='flex justify-between'>
          <h3>{notification.notification.content}</h3>
          <div className='flex gap-3'>
            <button onClick={declineReq} className='w-6 h-6 rounded-full flex justify-center items-center bg-red-400 text-black'><svg fill="none" viewBox="0 0 15 15" height="1em" width="1em">
              <path
                fill="currentColor"
                fillRule="evenodd"
                d="M11.782 4.032a.575.575 0 10-.813-.814L7.5 6.687 4.032 3.218a.575.575 0 00-.814.814L6.687 7.5l-3.469 3.468a.575.575 0 00.814.814L7.5 8.313l3.469 3.469a.575.575 0 00.813-.814L8.313 7.5l3.469-3.468z"
                clipRule="evenodd"
              />
            </svg></button>
            
            <button onClick={acceptReq} className='w-6 h-6 rounded-full flex justify-center items-center bg-green-400 text-black'><svg fill="none" viewBox="0 0 15 15" height="1em" width="1em" >

              <path
                stroke="currentColor"
                strokeLinecap="square"
                d="M1 7l4.5 4.5L14 3"
              />
            </svg></button>
          </div>
          
        </div>
      </div>
      
    )
  }

}

export default Notification;
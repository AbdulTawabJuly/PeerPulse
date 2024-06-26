import { Fragment, useState, useEffect } from "react";
import { Disclosure, Menu, Transition } from "@headlessui/react";
import { Bars3Icon, BellIcon, XMarkIcon } from "@heroicons/react/24/outline";
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import { Link, useParams } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { signOut } from "../auth/authSlice"
import { useSocket } from '../../context/socket';
import { selectLoggedInUser, selectNotifications, setNotifications } from "../auth/authSlice";
import Notification from "../friends/components/Notification"
import axios from 'axios'
import { sendReqAsync, selectErrors, selectStatus, setErrorToNull, setLoadingToNull } from '../friends/friendSlice';
import { useNavigate } from "react-router-dom";
import { useLocation } from "react-router-dom";
import { LeaveRoom } from "../rooms/RoomSlice";

const navigation = [{ name: "Room", link: "/rooms", current: true }];


function classNames(...classes) {
  return classes.filter(Boolean).join(" ");
}



export default function Navbar() {

  const errors = useSelector(selectErrors);
  const status = useSelector(selectStatus);
  const navigate=useNavigate();
  const location=useLocation();
  useEffect(() => {
    if (status === 'fulfilled') {
       toast.success(errors, {
          position: "bottom-right",
          autoClose: 2000,
          hideProgressBar: true,
          closeOnClick: true,
          pauseOnHover: true,
          draggable: true,
          progress: undefined,
          theme: "colored",
       });
    }
    else if (status === 'error') {
       toast.error(errors, {
          position: "bottom-right",
          autoClose: 2000,
          hideProgressBar: true,
          closeOnClick: true,
          pauseOnHover: true,
          draggable: true,
          progress: undefined,
          theme: "colored",
       });
    }
 }, [status])

  const dispatch = useDispatch();
  function handleLogout() {
    dispatch(signOut());
  }
  const user = useSelector(selectLoggedInUser);
  // const [notifications, setNotifications] = useState([]);
  const notifications = useSelector(selectNotifications)
  const [style, setStyle] = useState('');


  const fetchNotifications = async () => {
    try {
      const response = await axios.get('http://localhost:8080/api/friend/getNotifications', {
        params: {
          username: user.user.username
        }
      });
      dispatch(setNotifications(response.data.messages));

    } catch (error) {
      console.error('Error fetching notifications:', error);
    }
  };

  const handleBellClick = async() => {
    await fetchNotifications();
  }

  useEffect(() => {
    /*const intervalId = setInterval(() => {
      if (notifications) {
        setStyle('transform rotate-45 transition text-white')
        setInterval(() => {
          setStyle('transform -rotate-45 transition text-white')
          setInterval(() => {
            setStyle('')
          }, 200)
        }, 200)
      }
      else {
        setStyle('');
      }
    }, 2000);*/

  }, []);

  useEffect(() => {
    fetchNotifications();
  }, [])
  const roomID=useParams();
const handleprofileclick=()=>{
  const shouldReplace=location.pathname.startsWith('/room/');
  if(shouldReplace){
    const RoomDetail = {
      id: roomID,
      user_: user.user.id,
    };
  dispatch(LeaveRoom(RoomDetail));
  }
  navigate('/profile/'+user.user.id,{replace:shouldReplace});
}
  return (

    <Disclosure as="nav" className=" bg-Secondary-0 w-full">
      {({ open }) => (
        <>
          <div className="mx-auto max-w-7xl px-2 sm:px-6 lg:px-8">
            <div className="relative flex h-16 items-center justify-between">
              <div className="absolute inset-y-0 left-0 flex items-center sm:hidden">
                {/* Mobile menu button*/}
                <Disclosure.Button className="relative inline-flex items-center justify-center rounded-md p-2 text-gray-400 hover:bg-gray-700 hover:text-white focus:outline-none focus:ring-2 focus:ring-inset focus:ring-white">
                  <span className="absolute -inset-0.5" />
                  <span className="sr-only">Open main menu</span>
                  {open ? (
                    <XMarkIcon className="block h-6 w-6" aria-hidden="true" />
                  ) : (
                    <Bars3Icon className="block h-6 w-6" aria-hidden="true" />
                  )}
                </Disclosure.Button>
              </div>
              <div className="flex flex-1 items-center justify-center sm:items-stretch sm:justify-start">
                <div className="flex flex-shrink-0 items-center">
                  {
                    <Link to="/">
                      <div className="mx-auto ml-0 pl-0 max-w-7xl px-4 py-6 sm:px-6 lg:px-8 ">
                        <h1 className="text-3xl font-Logo font-bold tracking-tight text-white">
                          PeerPulse
                        </h1>
                      </div>
                    </Link>
                  }
                </div>
                {/* <div className="hidden mt-6 sm:ml-6 sm:block">
                  <div className="flex space-x-4">
                    {navigation.map((item) => (
                      <a
                        key={item.name}
                        href={item.href}
                        className={classNames(
                          item.current
                            ? " bg-gray-900 text-white"
                            : "text-white hover:scale-110",
                          "rounded-md px-3 py-2 text-sm font-medium"
                        )}
                        aria-current={item.current ? "page" : undefined}
                      >
                        {item.name}
                      </a>
                    ))}
                  </div>
                </div> */}
              </div>
              <div className="absolute inset-y-0 right-0 flex items-center pr-2 sm:static sm:inset-auto sm:ml-6 sm:pr-0">
                {/* <button
                  type="button"
                  className="relative rounded-full bg-gray-800 p-1 text-gray-400 hover:text-white focus:outline-none focus:ring-2 focus:ring-white focus:ring-offset-2 focus:ring-offset-gray-800"
                >
                  <span className="absolute -inset-1.5" />
                  <span className="sr-only">View notifications</span>
                  <BellIcon className="h-6 w-6" aria-hidden="true" />
                </button> */}

                <Menu as='div' className='relative ml-3'>
                  <div>
                    <Menu.Button onClick={handleBellClick} className={`${style} relative rounded-full bg-gray-800 p-1 text-gray-400 hover:text-white focus:outline-none focus:ring-2 focus:ring-white focus:ring-offset-2 focus:ring-offset-gray-800`}>
                      <span className="absolute -inset-1.5" />
                      <span className="sr-only">View notifications</span>
                      <BellIcon className="h-6 w-6 " aria-hidden="true" />
                    </Menu.Button>
                  </div>
                  <Transition
                    as={Fragment}
                    enter="transition ease-out duration-100"
                    enterFrom="transform opacity-0 scale-95"
                    enterTo="transform opacity-100 scale-100"
                    leave="transition ease-in duration-75"
                    leaveFrom="transform opacity-100 scale-100"
                    leaveTo="transform opacity-0 scale-95"
                  >
                    <Menu.Items className="absolute right-0 z-10 mt-2 w-96 origin-top-right rounded-md bg-white py-1 shadow-lg ring-1 ring-black ring-opacity-5 focus:outline-none">
                      {notifications&&notifications.length!==0 ? notifications.map((notification) => (
                        <Menu.Item>
                          <Notification notification={notification} />
                        </Menu.Item>
                      )
                      ) : (<Menu.Item>
                        <div className='block px-4 py-4 text-sm text-gray-700 border-b-2 border-gray-400'>
                          <h3>You have no new notifications</h3>
                        </div>
                      </Menu.Item>)}
                    </Menu.Items>
                  </Transition>
                </Menu>

                {/* Profile dropdown */}
                <Menu as="div" className="relative ml-3">
                  <div>
                    <Menu.Button className="relative flex rounded-full bg-white text-sm focus:outline-none focus:ring-2 focus:ring-white focus:ring-offset-2 focus:ring-offset-gray-800">
                      
                      <img
                        className="h-8 w-8 rounded-full object-contain"
                        src={user.user.image}
                        alt=""
                      />
                    </Menu.Button>
                  </div>
                  <Transition
                    as={Fragment}
                    enter="transition ease-out duration-100"
                    enterFrom="transform opacity-0 scale-95"
                    enterTo="transform opacity-100 scale-100"
                    leave="transition ease-in duration-75"
                    leaveFrom="transform opacity-100 scale-100"
                    leaveTo="transform opacity-0 scale-95"
                  >
                    <Menu.Items className="absolute right-0 z-10 mt-2 w-48 origin-top-right rounded-md bg-white py-1 shadow-lg ring-1 ring-black ring-opacity-5 focus:outline-none">
                      <Menu.Item>
                        {({ active }) => (
                          <a
                            onClick={()=>handleprofileclick()}
                            
                            className={classNames(
                              active ? "bg-gray-100" : "",
                              "block px-4 py-2 text-sm text-gray-700"
                            )}
                          >
                            {user.user.username}
                          </a>
                        )}
                      </Menu.Item>
                    
                      <Menu.Item>
                        {({ active }) => (
                          <button onClick={handleLogout} className={classNames(
                            active ? "bg-gray-100" : "",
                            "block px-4 py-2 text-sm text-gray-700"
                          )}>
                            Sign out
                          </button>
                        )}
                      </Menu.Item>
                    </Menu.Items>
                  </Transition>
                </Menu>
              </div>
            </div>
          </div>

          {/* <Disclosure.Panel className="sm:hidden">
            <div className="space-y-1 px-2 pb-3 pt-2">
              {navigation.map((item) => (
                <Disclosure.Button
                  key={item.name}
                  as="a"
                  href={item.href}
                  className={classNames(
                    item.current
                      ? "bg-none text-white"
                      : "text-gray-300 hover:bg-gray-700 hover:text-white",
                    "block rounded-md px-3 py-2 text-base font-medium"
                  )}
                  aria-current={item.current ? "page" : undefined}
                >
                  {item.name}
                </Disclosure.Button>
              ))}
            </div>
          </Disclosure.Panel> */}
        </>
      )}
    </Disclosure>
    
  );
}

import React from 'react';
import Message from './Message';
import { useState, useRef, useEffect } from 'react';
import '../../../App.css'
import { useSelector, useDispatch } from 'react-redux';
import { selectLoggedInUser } from '../../auth/authSlice';
import { useSocket } from '../../../context/socket'
import { sendMessage, selectMessages } from "../../chat/ChatSlice";
import {useParams} from 'react-router-dom';

function Messages() {

  const newMsg = useRef();
  const user = useSelector(selectLoggedInUser);
  const [message, setMessage] = useState('');
  const messages = useSelector(selectMessages);
  const { getSocket } = useSocket();
  const roomID = useParams();
  const container = useRef();
  const inputRef = useRef();

  const handleChange = (e) => {
    setMessage(e.target.value);
  }

  const dispatch = useDispatch();

  const handleClick = () => {
    const msg  = {
      type:'sent',
      user:user.user.email,
      content:message
    }
    dispatch(sendMessage(msg));
    setMessage("")
    const newSocket = getSocket();
    newSocket.emit("send-message",msg,roomID.id);
    const div = container.current;
    div.scrollTop = div.scrollHeight + 80;
    
  }

  const handleKeyDown = (e) => {
    if (e.key === 'Enter') {
      handleClick();
    }
  };

  useEffect(() => {
    const newSocket = getSocket();
    if (newSocket) {
        newSocket.on("recieve-message",(message)=> {
          newMsg.current?.scrollIntoView({behavior:'smooth', block:'end'});
        })
    }
    inputRef.current.focus();

  }, [getSocket])

  return (
    <div className='h-96 w-96 relative ' >

      <div className='chat max-h-64 overflow-y-auto' ref={container}>
        {messages && messages.map((msg) => (<Message type={msg.type} user={msg.user} content={msg.content} />))}
      </div>

      <div className='input absolute bottom-16 left-2'>
        <div className='h-10 flex justify-between rounded-full bg-gray-100 mx-auto' style={{ width: '360px' }}>
          <input type='text' placeholder='Type something ...' className='bg-gray-100 ml-4 msg-input truncate' style={{ width: '250px' }} onChange={handleChange} value={message} ref={inputRef} autoFocus onKeyDown={handleKeyDown}/>
          <div>
            <button onClick={handleClick} className='p-2'>
              <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 20 20" fill="currentColor" className="w-5 h-5">
                <path fillRule="evenodd" d="M15.621 4.379a3 3 0 00-4.242 0l-7 7a3 3 0 004.241 4.243h.001l.497-.5a.75.75 0 011.064 1.057l-.498.501-.002.002a4.5 4.5 0 01-6.364-6.364l7-7a4.5 4.5 0 016.368 6.36l-3.455 3.553A2.625 2.625 0 119.52 9.52l3.45-3.451a.75.75 0 111.061 1.06l-3.45 3.451a1.125 1.125 0 001.587 1.595l3.454-3.553a3 3 0 000-4.242z" clipRule="evenodd" />
              </svg>

            </button>
            <button onClick={handleClick} className='p-2'>
              <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 20 20" fill="currentColor" className="w-5 h-5">
                <path d="M3.105 2.289a.75.75 0 00-.826.95l1.414 4.925A1.5 1.5 0 005.135 9.25h6.115a.75.75 0 010 1.5H5.135a1.5 1.5 0 00-1.442 1.086l-1.414 4.926a.75.75 0 00.826.95 28.896 28.896 0 0015.293-7.154.75.75 0 000-1.115A28.897 28.897 0 003.105 2.289z" />
              </svg>
            </button>
          </div>

        </div>
      </div>
      <div ref={newMsg} />
    </div>

  )
}

export default Messages
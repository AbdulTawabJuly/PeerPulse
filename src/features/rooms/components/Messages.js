import React from 'react';
import Message from './Message';
import { useState, useRef, useEffect } from 'react';
import '../../../App.css'
import { useSelector, useDispatch } from 'react-redux';
import { selectLoggedInUser } from '../../auth/authSlice';
import { useSocket } from '../../../context/socket'
import { sendMessage, selectMessages } from "../../chat/ChatSlice";
import { useParams } from 'react-router-dom';

function Messages() {

  const newMsg = useRef();
  const user = useSelector(selectLoggedInUser);
  const [message, setMessage] = useState('');
  const messages = useSelector(selectMessages);
  const { getSocket } = useSocket();
  const roomID = useParams();
  const container = useRef();
  const inputRef = useRef();
  const [file, setFile] = useState(null);

  const handleChange = (e) => {
    setMessage(e.target.value);
  }

  const dispatch = useDispatch();

  const handleClick = async () => {
    const newSocket = getSocket();
    if (file) {
      const formData = new FormData();
      formData.append('file', file);

      try {
        // Use fetch or your preferred HTTP client to send the file to the server
        const response = await fetch('http://localhost:8080/upload', {
          method: 'POST',
          body: formData,
        });

        // Handle the server's response (e.g., display a success message)
        const result = await response.json();

        const msg = {
          type: 'sent',
          user: user.user.email,
          content: result.identifier,
          file:"true"
        }
        dispatch(sendMessage(msg));
        setMessage("")
        setFile(null);
        newSocket.emit("send-message", msg, roomID.id);
        const div = container.current;
      div.scrollTop = div.scrollHeight + 80;
      } catch (error) {
        console.error('Error uploading file:', error);
      }
    }
    else {
      const msg = {
        type: 'sent',
        user: user.user.email,
        content: message,
        file:undefined
      }
      dispatch(sendMessage(msg));
      setMessage("")
      // const newSocket = getSocket();
      newSocket.emit("send-message", msg, roomID.id);
      const div = container.current;
      div.scrollTop = div.scrollHeight + 80;
    }
  }

  const handleKeyDown = (e) => {
    if (e.key === 'Enter') {
      handleClick();
    }
  };

  const handleFileChange = (e) => {
    const selectedFile = e.target.files[0];
    setFile(selectedFile);
  };

  useEffect(() => {
    const newSocket = getSocket();
    if (newSocket) {
      newSocket.on("recieve-message", (message) => {
        newMsg.current?.scrollIntoView({ behavior: 'smooth', block: 'end' });
      })
    }
    inputRef.current.focus();

  }, [getSocket])

  return (
    <div className='h-96 w-96 relative ' >

      <div className='chat max-h-64 overflow-y-auto' ref={container}>
        {messages && messages.map((msg) => (<Message type={msg.type} user={msg.user} content={msg.content} file={msg.file} />))}
      </div>

      <div className='input absolute bottom-16 left-2'>
        <div className='h-10 flex justify-between rounded-full bg-gray-100 mx-auto' style={{ width: '360px' }}>
          <input type='text' placeholder='Type something ...' className='bg-gray-100 ml-4 msg-input truncate' style={{ width: '250px' }} onChange={handleChange} value={message} ref={inputRef} autoFocus onKeyDown={handleKeyDown} />
          <div>


            <input type='file' className='w-5 h-5 hidden' id='uploadBtn' onChange={handleFileChange}></input>
            <label for='uploadBtn' className='inline-block hover:cursor-pointer'>
              <svg fill="none" viewBox="0 0 24 24" height="1em" width="1em" className=''>
                <path
                  fill="currentColor"
                  d="M14 0a5 5 0 015 5v12a7 7 0 11-14 0V9h2v8a5 5 0 0010 0V5a3 3 0 10-6 0v12a1 1 0 102 0V6h2v11a3 3 0 11-6 0V5a5 5 0 015-5z"
                />
              </svg>
            </label>


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
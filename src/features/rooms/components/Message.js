import React from 'react'

function Message(msg) {
  if(msg.type === 'join') {
    return (
      <div className='text-center p-3'>
          <p className='text-sm'>
              {msg.user} joined
          </p>
      </div>
    )
  }
  else if(msg === 'recieved') {
    return (
      <div className='border rounded-lg flex items-center p-3'>
          <img className='rounded-full w-8 h-8' src='../profile.png' alt='prof-img'/>
          <p className='text-sm ml-2'>
              this is a dummy text
          </p>
      </div>
    )
  }
  
}

export default Message
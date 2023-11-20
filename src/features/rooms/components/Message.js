import React from 'react'

function Message(msg) {
  if (msg.type === 'join') {
    return (
      <div className='text-center p-2 bg-green-100 rounded-full w-3/4 mx-auto my-4'>
        <p className='text-sm italic'>
          {msg.user} <span className='not-italic pl-1'>joined</span>
        </p>
      </div>
    )
  }
  else if (msg.type === 'left') {
    return (
      <div className='text-center p-2 bg-red-100 rounded-full w-3/4 mx-auto my-4'>
         <p className='text-sm italic'>
          {msg.user} <span className='not-italic pl-1'>left</span>
        </p>
      </div>
    )
  }
  else if (msg.type === 'sent') {
    return (
      <div className='flex items-start justify-end p-3'>
        <div className='message bg-green-200 p-2 mr-2 rounded-lg'>
          <p className="text-sm font-medium italic ml-2">
            {msg.user}
          </p>
          <p className="text-sm ml-2 mt-2">
            {msg.content}
          </p>
        </div>
        <img className='rounded-full w-8 h-8' src='../profile.png' alt='prof-img' />
      </div>
    )
  }

  else if (msg.type === 'recieved') {
    return (
      <div className='flex items-start p-3'>
        <img className='rounded-full w-8 h-8' src='../profile.png' alt='prof-img' />
        <div className='message bg-blue-200 p-2 ml-2 rounded-lg'>
          <p className="text-sm font-medium italic ml-2">
            {msg.user}
          </p>
          <p className="text-sm ml-2 mt-2">
            {msg.content}
          </p>
        </div>
      </div>
    )
  }
  else if (msg.type === 'muted') {
    return (
      <div className='text-center p-2 bg-red-100 rounded-full w-3/4 mx-auto my-4'>
         <p className='text-sm italic'>
          {msg.user} <span className='not-italic pl-1'>has been muted</span>
        </p>
      </div>
    )
  }
  else if (msg.type === 'kicked') {
    return (
      <div className='text-center p-2 bg-red-100 rounded-full w-3/4 mx-auto my-4'>
         <p className='text-sm italic'>
          {msg.user} <span className='not-italic pl-1'>has been kicked</span>
        </p>
      </div>
    )
  }
  else if (msg.type === 'banned') {
    return (
      <div className='text-center p-2 bg-red-100 rounded-full w-3/4 mx-auto my-4'>
         <p className='text-sm italic'>
          {msg.user} <span className='not-italic pl-1'>has been banned</span>
        </p>
      </div>
    )
  }
  else if (msg.type === 'moderator') {
    return (
      <div className='text-center p-2 bg-blue-300 rounded-full w-3/4 mx-auto my-4'>
         <p className='text-sm italic'>
          {msg.user} <span className='not-italic pl-1'>is now a moderator</span>
        </p>
      </div>
    )
  }
}

export default Message
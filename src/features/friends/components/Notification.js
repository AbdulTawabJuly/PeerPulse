import React from 'react'

function Notification(notification) {
  console.log("x: ",notification.notification.content);
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
            <button className='w-6 h-6 rounded-full flex justify-center items-center bg-red-400 text-black'><svg fill="none" viewBox="0 0 15 15" height="1em" width="1em">
      <path
        fill="currentColor"
        fillRule="evenodd"
        d="M11.782 4.032a.575.575 0 10-.813-.814L7.5 6.687 4.032 3.218a.575.575 0 00-.814.814L6.687 7.5l-3.469 3.468a.575.575 0 00.814.814L7.5 8.313l3.469 3.469a.575.575 0 00.813-.814L8.313 7.5l3.469-3.468z"
        clipRule="evenodd"
      />
    </svg></button>
            <button className='w-6 h-6 rounded-full flex justify-center items-center bg-green-400 text-black'><svg fill="none" viewBox="0 0 15 15" height="1em" width="1em" >
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
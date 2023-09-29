import React from 'react'
import { useState,useEffect } from 'react';
import { Link } from 'react-router-dom';
function RoomCard({RoomDetails}) {
    const givenDate = new Date(RoomDetails.startingTime);
    const currentTime = Date.now();
    const timePassed = currentTime - givenDate.getTime();
const [timeLeft,setTimeLeft]=useState(Math.floor(60-(timePassed/(1000*60))));


useEffect(() => {
    const intervalId = setInterval(() => {
        const givenDate = new Date(RoomDetails.startingTime);
        const currentTime = Date.now();
        const timePassed = currentTime - givenDate.getTime();
        const timeWeHave=Math.floor(60-(timePassed/(1000*60)));

      if(timeWeHave<0)
      {
          setTimeLeft('Expired');
      }
      else{
        setTimeLeft(timeWeHave+' mins');
      }
}, 10);  
    
    return () => clearInterval(intervalId);
    
  }, [RoomDetails]);
       const roomNavigation="/room/"+RoomDetails._id;
        return (
    
      <Link to={roomNavigation} >
        <div className="m-2 w-64 h-36 flex flex-col bg-red-200 justify-between shadow-lg p-3 rounded-xl hover:scale-105 hover:shadow-xl hover:cursor-pointer">
            <div className='flex justify-around items-center'>
                <p className='font-bold text-sm'>{RoomDetails.name}</p>
                <p className='text-xs border px-2 border-black rounded-xl'>{timeLeft}</p>
            </div>
            <div class="flex justify-between items-center">
                <span className="flex">
                    <svg className='w-4 inline-block' xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke-width="1.5" stroke="currentColor" class="w-6 h-6">
                        <path stroke-linecap="round" stroke-linejoin="round" d="M15.75 6a3.75 3.75 0 11-7.5 0 3.75 3.75 0 017.5 0zM4.501 20.118a7.5 7.5 0 0114.998 0A17.933 17.933 0 0112 21.75c-2.676 0-5.216-.584-7.499-1.632z" />
                    </svg>
                    <p className="text-sm">{RoomDetails.noOfMembers}</p>
                </span>
                <img className="w-7 h-7 border border-black rounded-full" src="./logo192.png" alt="img"></img>
            </div>
        </div>

        </Link>
    )
}

export default RoomCard
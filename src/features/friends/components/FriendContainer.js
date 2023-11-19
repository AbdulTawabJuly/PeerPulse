import React from 'react'
import axios from 'axios'
import { useEffect } from 'react'
import { useSelector, useDispatch } from 'react-redux'
import { selectLoggedInUser } from '../../auth/authSlice'
import { selectFriends } from "../friendSlice"


function FriendContainer(friend) {

    return (

        <div>
            <div className="py-4 overflow-y-auto">
                <div className='online'>
                    <div className='flex gap-3 text-white items-center py-4'>
                        <h3>{friend.name}</h3>
                        <div className='w-2 h-2 rounded-full bg-green-100'>
                        </div>
                    </div>

                </div>
            </div>
        </div>
    )
}

export default FriendContainer
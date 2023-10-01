import React from "react";
import axios from "axios";

export function searchRooms(name){
    return new Promise(async(resolve,reject)=>{
        try{
            const response = await axios.get(
            "http://localhost:8080/api/room/search",
            {
              params: {
                RoomName: name,
              },
            }
          );
          if(response)
          {
            const result=response.data;
            resolve(result);
          }
          else{
            const result=response.data;
            reject(result.NoResults);
          }
        }
        catch(error)
        {
            reject(error);
        }

    })
}
export function CreateRoom(RoomDetails){
  
    return new Promise(async(resolve,reject)=>{
          try{
            const response = await axios.post(
                "http://localhost:8080/api/room/create",
                {
                  Room: RoomDetails.roomName,
                  currentUser: RoomDetails.user_,
                  isPublic: RoomDetails.priv,
                  isPaid: RoomDetails.paid,
                }
              );
              if(response)
              {
                resolve(response.data);
              }
              else
              {
                console.log(response.error);
                reject(response.error);
              }
            
          }
          catch(error)
          {
             reject(error.response.data.error);    
          }
    })
}
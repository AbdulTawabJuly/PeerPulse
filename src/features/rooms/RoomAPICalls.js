import React from "react";
import axios from "axios";

export function searchRooms(name) {
  return new Promise(async (resolve, reject) => {
    try {
      const response = await axios.get(
        "http://localhost:8080/api/room/search",
        {
          params: {
            RoomName: name,
          },
        }
      );
      if (response) {
        const result = response.data;
        resolve(result);
      } else {
        const result = response.data;
        reject(result.NoResults);
      }
    } catch (error) {
      reject(error);
    }
  });
}
export function CreateRoom(RoomDetails) {
  return new Promise(async (resolve, reject) => {
    console.log("Paid from API ",RoomDetails.paid)
    try {
      const response = await axios.post(
        "http://localhost:8080/api/room/create",
        {
          Room: RoomDetails.roomName,
          currentUser: RoomDetails.user_,
          isPublic: RoomDetails.priv,
          isPaid: RoomDetails.paid,
          price: RoomDetails.price,
        }
      );
      if (response) {
        resolve(response.data);
      } else {
        console.log(response.error);
        reject(response.error);
      }
    } catch (error) {
      reject(error.response.data.error);
    }
  });
}
export function Joinroom(RoomDetails) {
  return new Promise(async (resolve, reject) => {
    try {
      const response = await axios.get(
        "http://localhost:8080/api/room/JoinRoom",
        {
          params: {
            RoomID: RoomDetails.id,
            UserID: RoomDetails.user_,
          },
        }
      );
      if (response) {
        resolve(response);
      } else {
        reject(response.error);
      }
    } catch (error) {
      reject(error.response.data.error);
    }
  });
}
export function Leaveroom(RoomDetails) {
  return new Promise(async (resolve, reject) => {
    try {
      const response = await axios.get("http://localhost:8080/api/room/leave", {
        params: {
          RoomID: RoomDetails.id,
          currentUser: RoomDetails.user_,
        },
      });
      if (response.data) {
        resolve(response.data);
      } else {
        reject(response.error);
      }
    } catch (error) {
      reject(error.response.data.error);
    }
  });
}

// export function Getroom (RoomDetails) {
//   return new Promise(async(resolve,reject)=> {
//     try {
//       const response = await axios.get('http://localhost:8080/getRoom',{
//         params: {
//           RoomID: RoomDetails.id
//         }
//       })
//       if(response.data) {
//         resolve(response.data);
//       }
//       else {
//         reject(response.error);
//       }
//     }
//     catch(error) {
//       reject(error.response.data.error);
//     }
//   })
// }

import axios from "axios"
export function Makemoderator(RoomDetails) {
    return new Promise(async (resolve, reject) => {
      try {
        const response = await axios.get("http://localhost:8080/api/room/makemoderator", {
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
export function Removemoderator(RoomDetails) {
    return new Promise(async (resolve, reject) => {
      try {
        const response = await axios.get("http://localhost:8080/api/room/removemoderator", {
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
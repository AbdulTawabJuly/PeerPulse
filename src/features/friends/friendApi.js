import axios from 'axios'

export function sendReq(data) {
    return new Promise(async (resolve, reject) => {
      try {
        const response = await axios.get(
          "http://localhost:8080/api/friend/sendReq",
          {
            params: {
              user_username: data.user,
              friend_username: data.friend,
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

export function addFriend (data) {
  return new Promise(async (resolve, reject) => {
    try {
      const response = await axios.get(
        "http://localhost:8080/api/friend/addFriend",
        {
          params: {
            user_username: data.user,
            friend_username: data.friend,
            notificationID: data.notificationID
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

export function declineReq(data) {
  return new Promise(async (resolve, reject) => {
    try {
      const response = await axios.get(
        "http://localhost:8080/api/friend/declineReq",
        {
          params: {
            user_username: data.user,
            friend_username: data.friend,
            notificationID: data.notificationID
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
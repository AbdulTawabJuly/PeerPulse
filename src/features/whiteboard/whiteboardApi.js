import axios from 'axios';

export function addMember(data) {
  return new Promise(async (resolve, reject) => {
    try {
      const response = await axios.post(
        'http://localhost:8080/api/whiteboard/member',
        {
          memberId: data.memberId,
          roomId: data.roomId
          // Include any other relevant data needed for adding a member
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

export function removeMember(data) {
  return new Promise(async (resolve, reject) => {
    try {
      const response = await axios.delete(
        `http://localhost:8080/api/whiteboard/member`,
        {
          params: {
            roomId: data.roomId,
            memberId: data.memberId,
        },
        });
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

export function getMembers(data) {
    return new Promise(async (resolve, reject) => {
        try {
            const response = await axios.get('http://localhost:8080/api/whiteboard/members',
            {
                params: {
                    roomId: data.roomId,
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

// You can include additional API functions as needed

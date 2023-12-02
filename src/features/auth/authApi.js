import axios from "axios";
export function createUser(userData) {
  return new Promise(async (resolve, reject) => {
    try {
      const response = await fetch("http://localhost:8080/api/auth/register", {
        method: "POST",
        body: JSON.stringify(userData),
        headers: { "content-type": "application/json" },
      });
      if (response.ok) {
        const data = await response.json();
        resolve({ data });
      } else {
        const json = await response.json();
        reject(json.error);
      }
    } catch (err) {
      reject(err);
    }
  });
}

export function checkUser(loginInfo) {
  return new Promise(async (resolve, reject) => {
    try {
      const response = await fetch("http://localhost:8080/api/auth/login", {
        method: "POST",
        body: JSON.stringify(loginInfo),
        headers: { "content-type": "application/json" },
      });
      if (response.ok) {
        const data = await response.json();
        resolve({ data });
      } else {
        const json = await response.json();
        reject(json.error);
      }
    } catch (err) {
      reject(err);
    }
  });
}

export function resetPasswordRequest(email) {
  return new Promise(async (resolve, reject) => {
    try {
      const response = await fetch(
        "http://localhost:8080/api/auth/reset-password-request",
        {
          method: "POST",
          body: JSON.stringify({ email }),
          headers: { "content-Type": "application/json" },
        }
      );
      if (response.ok) {
        const data = await response.json();
        resolve({ data });
      } else {
        const error = await response.text();
        reject(error);
      }
    } catch (error) {
      reject(error);
    }
  });
}

export function resetPassword(data) {
  return new Promise(async (resolve, reject) => {
    try {
      const response = await fetch(
        "http://localhost:8080/api/auth/reset-password",
        {
          method: "POST",
          body: JSON.stringify(data),
          headers: { "content-Type": "application/json" },
        }
      );
      if (response.ok) {
        const data = await response.json();
        resolve({ data });
      } else {
        const error = await response.text();
        reject(error);
      }
    } catch (error) {
      reject(error);
    }
  });
}
export function GetUser(data){
  return new Promise(async(resolve,reject)=>{
    try{
      const response=await axios.get("http://localhost:8080/api/auth/getuser",{
        params:{
          id:data.id,
        }
      });
      if(response){
        resolve(response.data);
      }else{
        reject(response.error);
      }

    }
    catch(error){
           reject(error.response.data.error);
    }
  })
}
export function updateUserInfo(data){
  return new Promise(async(resolve,reject)=>{
    try{
      const response=await axios.get("http://localhost:8080/api/auth/update-user",{
        params:{
          data,
        }
      });
      if(response){
        resolve(response.data);
      }else{
        reject(response.error);
      }

    }
    catch(error){
        reject(error.response.data.error);
    }
  })
}

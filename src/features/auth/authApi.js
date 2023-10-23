
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
      }
      else {
        const json = await response.json();
        reject(json.error);
      }
    }
    catch (err) {
      reject(err)
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
      }
      else {
        const json = await response.json();
        reject(json.error);
      }
    } catch (err) {
      reject(err);
    }
  });
}

export function resetPasswordRequest(email){
  return new Promise(async (resolve,reject)=>{
    try{
      const response = await fetch("http://localhost:8080/api/auth/reset-password-request",{
        method:"POST",
        body:JSON.stringify( {email} ),
        headers:{ "Content-Type":"application/json"}
      });
      if(response.ok){
        const data = await response.json();
        resolve({data});
      }else{
        const error = await response.text();
        reject(error);
      }
    }catch(error){
      reject(error)
    }
  })
}

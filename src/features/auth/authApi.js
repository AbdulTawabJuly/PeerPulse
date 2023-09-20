export function createUser(userData) {
  return new Promise(async (resolve) => {
    const response = await fetch("http://localhost:8080/api/auth/register", {
      method: "POST",
      body: JSON.stringify(userData),
      headers: { "content-type": "application/json" },
    });
    const data = await response.json();
    console.log('data: ',data);
    resolve({ data });
  });
}

export function checkUser(loginInfo) {
  return new Promise(async (resolve, reject) => {
    const email = loginInfo.email;
    const password = loginInfo.password;
    const response = await fetch("http://localhost:8080/users?email=" + email);
    const data = await response.json();
    if (data.length) {
      if(password===data[0].password){
        resolve({ data: data[0] });
      }else{
        reject({ message: "Wrong Credentials" });
      }
    } else {
      reject({ message: "User Not Found" });
    }
    resolve({ data });
  });
}

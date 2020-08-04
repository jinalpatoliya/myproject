import Axios from "axios";

export const login = (user) => {
  return Axios.post("/user/login", user)
    .then((response) => response.data)
    .catch((error) => {
      throw error.response;
    });
};

export const forgetpasswordUser = (email) => {
  console.log("forgetpasswordUser Action Coming",email);
  const user = {
    email:email
  }
  return Axios.post("/user/forgetpassword",user)
              .then((response)=>response.data)
              .catch((error)=>{
                throw error.response;
              });
}
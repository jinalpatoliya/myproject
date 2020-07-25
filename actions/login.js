import Axios from "axios";

export const login = (user) => {
  return Axios.post("/user/login", user)
    .then((response) => response.data)
    .catch((error) => {
      throw error.response;
    });
};

export const forgetpassword = (user) => {
  return Axios.put("/user/forgetpassword",user)
              .then((response)=>response.data)
              .catch((error)=>{
                throw error.response;
              });
}
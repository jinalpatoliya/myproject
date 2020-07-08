import Axios from "axios";

export const signup = (user) => {
  return Axios.post("/user/register", user)
    .then((response) => response.data)
    .catch((error) => {
      throw error.response;
    });
};

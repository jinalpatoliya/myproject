import Axios from "axios";

export const login = (user) => {
  return Axios.post("/api/v1/user/login", user)
    .then((response) => response.data)
    .catch((error) => {
      throw error.response;
    });
};

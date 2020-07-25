import Axios from "axios";

export const PendingSignup = (user) => {
  return Axios.post("/pendinguser/register", user)
    .then((response) => response.data)
    .catch((error) => {
      throw error.response;
    });
};

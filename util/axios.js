import axios from "axios";
import getServerUrl from "./getServerUrl";

export const configureServerURLToAxios = () => {
  axios.defaults.baseURL = getServerUrl();
};

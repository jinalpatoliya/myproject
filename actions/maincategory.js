import Axios from "axios";
import getServerUrl from "../util/getServerUrl";

export const getMainCategories = () => {
  return Axios.get("/api/v1/maincategory/")
    .then((response) => response.data)
    .catch((error) => console.log(error));
};

export const insertMainCategory = (maincategory) => {
  console.log("Action Category", maincategory);
  return Axios.post("/api/v1/maincategory/", maincategory)
    .then((response) => response.data)
    .catch((error) => {
      throw error.response;
    });
};

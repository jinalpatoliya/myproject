import Axios from "axios";
import getServerUrl from "../util/getServerUrl";

export const getCategories = () => {
  return Axios.get("/category/")
    .then((response) => response.data)
    .catch((error) => console.log(error));
};

export const insertCategory = (categoryName) => {
  return Axios.post("http://localhost:3000/api/v1/category/", categoryName)
    .then((response) => response.data)
    .catch((error) => {
      throw error.response;
    });
};



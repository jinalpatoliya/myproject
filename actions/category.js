import Axios from "axios";

export const getCategories = () => {
  return Axios.get("/category/")
    .then((response) => response.data)
    .catch((error) => console.log(error));
};

export const insertCategory = (categoryName) => {
  return Axios.post("/category/", categoryName)
    .then((response) => response.data)
    .catch((error) => {
      throw error.response;
    });
};

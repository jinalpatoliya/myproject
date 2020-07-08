import Axios from "axios";

export const getMainCategories = () => {
  return Axios.get("/maincategory/")
    .then((response) => response.data)
    .catch((error) => console.log(error));
};

export const insertMainCategory = (maincategory) => {
  console.log("Action Category", maincategory);
  return Axios.post("/maincategory/", maincategory)
    .then((response) => response.data)
    .catch((error) => {
      throw error.response;
    });
};

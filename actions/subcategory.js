import Axios from "axios";

export const getsubcategoriesById = (categoryId) => {
  return Axios.get(
    `/subcategory/category/${categoryId}`
  )
    .then((response) => response.data)
    .catch((error) => console.log(error));
};


export const insertSubcategory = (subcategoryName) => {
  return Axios.post(
    "/subcategory/",
    subcategoryName
  )
    .then((response) => response.data)
    .catch((error) => {
      throw error.response;
    });
};

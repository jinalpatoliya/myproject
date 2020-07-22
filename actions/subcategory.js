import Axios from "axios";
export const getSubcatgeories = () => {
  return Axios.get("/subcategory/")
    .then((response) => response.data)
    .catch((error) => console.log(error));
};


export const getsubcategoryById = (categoryId) => {
  return Axios.get(`/subcategory/${categoryId}`)
    .then((response) => response.data)
    .catch((error) => console.log(error));
};

export const getsubcategoriesById = (categoryId) => {
  return Axios.get(`/subcategory/category/${categoryId}`)
    .then((response) => response.data)
    .catch((error) => console.log(error));
};

export const getSubcategoriesBySlug = (categorySlug) => {
  console.log("Action Comingg", categorySlug);
  return Axios.get(`/subcategory/categoryslug/${categorySlug}`)
    .then((response) => response.data)
    .catch((error) => console.log(error));
};

export const insertSubcategory = (subcategory) => {
  console.log("subcategoryName Action", subcategory);
  return Axios.post("/subcategory/", subcategory)
    .then((response) => response.data)
    .catch((error) => {
      throw error.response;
    });  
};

export const editSubcategory = (subcategory) => {
  return Axios.put(`/subcategory/${subcategory.id}`, subcategory)
    .then((response) => response.data)
    .catch((error) => {
      throw error.response;
    });
}; 

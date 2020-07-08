import Axios from "axios"

export const getMainCategoryMapping = () => {
  return Axios.get(' http://localhost:3000/api/v1/maincategorymapping/')
      .then(response => response.data)
      .catch(error => console.log(error))
}


export const insertMainCategoryMapping = (maincategorymapping) => {
    console.log("Action MAin Cat MappingCategory",maincategorymapping);
    return Axios.post(' http://localhost:3000/api/v1/maincategorymapping/',maincategorymapping)
           .then(response => response.data) 
           .catch((error) => {
            throw error.response;
          });  
}

export const getcategoriesByMainCategoryId = (maincategoryId) => {
  // console.log("getcategoriesByMainCategoryId",getcategoriesByMainCategoryId)
  return Axios.get(
    `http://localhost:3000/api/v1/maincategorymapping/maincategory/${maincategoryId}`
  )
    .then((response) => response.data)
    .catch((error) => console.log(error));
};
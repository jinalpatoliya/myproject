import Axios from "axios"

export const getMainCategoryMapping = () => {
  return Axios.get('/maincategorymapping/')
      .then(response => response.data)
      .catch(error => console.log(error))
}


export const insertMainCategoryMapping = (maincategorymapping) => {
    console.log("Action MAin Cat MappingCategory",maincategorymapping);
    return Axios.post('/maincategorymapping/',maincategorymapping)
           .then(response => response.data) 
           .catch((error) => {
            throw error.response;
          });  
}

export const getcategoriesByMainCategoryId = () => {
  // console.log("getcategoriesByMainCategoryId",getcategoriesByMainCategoryId)
  return Axios.get(
    `/maincategorymapping/maincategory`
  )
    .then((response) => response.data)
    .catch((error) => console.log(error));
};
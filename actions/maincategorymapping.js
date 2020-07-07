import Axios from "axios"

export const insertMainCategoryMapping = (maincategorymapping) => {
    console.log("Action MAin Cat MappingCategory",maincategorymapping);
    return Axios.post(' http://localhost:3000/api/v1/maincategorymapping/',maincategorymapping)
           .then(response => response.data) 
           .catch((error) => {
            throw error.response;
          });  
}
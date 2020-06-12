import Axios from 'axios'

export const getsubcategories = () =>{
    return Axios.get(' http://localhost:3000/api/v1/subcategory/')
      .then(response => response.data)
      .catch(error => console.log(error))
}

export const insertSubcategory = (subcategoryName) => {
  console.log("Action Sub Category",subcategoryName);
  return Axios.post('http://localhost:3000/api/v1/subcategory/',subcategoryName)
         .then(response => response.data) 
         .catch(error=>console.log(error))
}
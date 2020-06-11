import Axios from 'axios'

export const getsubcategories = () =>{
    return Axios.get(' http://localhost:3000/api/v1/subcategory/')
      .then(response => response.data)
      .catch(error => console.log(error))
}
import Axios from "axios"

export const getMainCategories = () => {
    return Axios.get(' http://localhost:3000/api/v1/maincategory/')
        .then(response => response.data)
        .catch(error => console.log(error))
}

export const insertMainCategory = (maincategory) => {
    console.log("Action Category",maincategory);
    return Axios.post('http://localhost:3000/api/v1/maincategory/',maincategory)
           .then(response => response.data) 
           .catch(error=>console.log(error))
}
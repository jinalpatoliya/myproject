import Axios from "axios"

export const getCategories = () => {
    return Axios.get(' http://localhost:3000/api/v1/category/')
        .then(response => response.data)
        .catch(error => console.log(error))
}
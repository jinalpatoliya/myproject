import Axios from "axios"

export const getComment = (id) => {
    return Axios.post('http://localhost:3000/api/v1/comment/id',id)
        .then(response => response.data)
        .catch(error => console.log(error))
}

export const insertComment = (comment) => {    
    return Axios.post('http://localhost:3000/api/v1/comment/',comment)
           .then(response => response.data) 
           .catch(error=>console.log(error))
}
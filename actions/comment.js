import Axios from "axios"

export const getComment = (id) => {
    return Axios.post('/comment/id',id)
        .then(response => response.data)
        .catch(error => console.log(error))
}

export const insertComment = (comment) => {    
    return Axios.post('/comment/',comment)
           .then(response => response.data) 
           .catch(error=>console.log(error))
}
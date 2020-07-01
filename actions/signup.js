import Axios from 'axios'


export const signup = (user) => {
    Axios.post('http://localhost:3000/api/v1/user/register', user)
    .then(response => response.data)
    .catch(error => {
    console.log(error);
})
}
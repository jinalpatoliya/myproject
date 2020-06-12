import Axios from 'axios'

// let  token1  = window.localStorage.getItem("login");
// token1=JSON.parse(token1);
// const user = token1.token;
// console.log("Token :",user)
// const headers = {
//     "Authorization": user
// }
    //   global.axios.defaults.headers.common.Authorization = token ? `Bearer ${token}` : null;
    // return Axios.post('http://localhost:3000/api/v1/question',questionInsert,  {
    //     headers: headers
    // })
export const getInsertQuestion =(questionInsert)=>{
    return Axios.post('http://localhost:3000/api/v1/question',questionInsert)
                .then(response => {
                    console.log("Data inserted",response.data)                    
                })
                .catch(error => {
                    console.log(error);
                })
}
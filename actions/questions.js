import Axios from 'axios'
import jsCookie from 'js-cookie'

let token1 = jsCookie.get("screenname");
// console.log("Question Action Cookie Value", token1)
let headers={}
if (typeof token1 !== "undefined" && token1 !== "undefined") {
    token1 = JSON.parse(token1);
    const token = token1.token;
    // console.log("Question Action After Parse Cookie Value", token)
     headers = {
        "Authorization": token
    }
}

// headers: ctx.req ? { cookie: ctx.req.headers.cookie } : undefined
export const getInsertQuestion = (questionInsert) => {
    return Axios.post('http://localhost:3000/api/v1/question', questionInsert, {
        headers: headers
    })
        .then(response => {
            console.log("Data inserted", response.data)
        })
        .catch(error => {
            console.log(error);
        })
}

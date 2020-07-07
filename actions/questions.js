import Axios from "axios";
import { Cookies } from "react-cookie";

const cookies = new Cookies();
let headers = null;
let token1 = cookies.get("token");
if (typeof token1 !== "undefined" && token1 !== "undefined") {  
  headers = {
    Authorization: token1,
  };
}

export const getInsertQuestion = (questionInsert) => {
  return Axios.post("http://localhost:3000/api/v1/question", questionInsert, {
    headers: headers,
  })
    .then((response) => response.data)
    .catch((error) => {
      console.log(error);
    });
};
export const getEditQuestion = (questionEdit) => {  
  return Axios.put(
    `http://localhost:3000/api/v1/question/${questionEdit.id}`,
    questionEdit,
    {
      headers: headers,
    }
  )
    .then((response) => response.data)
    .catch((error) => {
      console.log(error);
    });
};
export const getQuestionBySubId = (subcategory_id) => {
  return Axios.post(
    `http://localhost:3000/api/v1/question/subcate/${subcategory_id}`
  )
    .then((response) => response.data)
    .catch((error) => console.log(error));
};
export const getQuestionById = (id) => {
  return Axios.get(`http://localhost:3000/api/v1/question/${id}`)
    .then((response) => response.data)
    .catch((error) => console.log(error));
};

export const getQuestion = () => {
  return Axios.get("http://localhost:3000/api/v1/question")
    .then((response) => response.data)
    .catch((error) => console.log(error));
};
export const getPerPageQuestion = (category, subcategory, page) => {
  return Axios.get(
    `http://localhost:3000/api/v1/question/slug/${category}/subslug/${subcategory}?pageNum=${page}`
  )
    .then((response) => response.data)
    .catch((error) => console.log(error.response.data));
};
export const checkDuplicateQuestionStatus = (question) => {
  return Axios.get(    
    `http://localhost:3000/api/v1/question/questioncheck/${question}`
  )
  .then((response)=>response.data)
  .catch((error)=>console.log(error));
}

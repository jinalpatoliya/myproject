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
  return Axios.post("/question", questionInsert, {
    headers: headers,
  })
    .then((response) => response.data)
    .catch((error) => {
      console.log(error);
    });
};
export const getEditQuestion = (questionEdit) => {  
  return Axios.put(
    `/question/${questionEdit.id}`,
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
    `/question/subcate/${subcategory_id}`
  )
    .then((response) => response.data)
    .catch((error) => console.log(error));
};
export const getQuestionById = (id) => {
  return Axios.get(`/question/${id}`)
    .then((response) => response.data)
    .catch((error) => console.log(error));
};

export const getQuestion = () => {
  return Axios.get("/question")
    .then((response) => response.data)
    .catch((error) => console.log(error));
};
export const getPerPageQuestion = (category, subcategory, page) => {
  return Axios.get(
    `/question/slug/${category}/subslug/${subcategory}?pageNum=${page}`
  )
    .then((response) => response.data)
    .catch((error) => console.log(error.response.data));
};
export const checkDuplicateQuestionStatus = (question) => {
  console.log("Question Action Check",question)
  return Axios.get(    
    `/question/questioncheck/${question}`
  )
  .then((response)=>response.data)
  .catch((error)=>console.log(error));
}
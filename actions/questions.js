import Axios from "axios";
import { Cookies } from "react-cookie";
const cookies = new Cookies();
let headers = null;
let token1 = cookies.get("token");
console.log("User Login Action vAlue : ", token1);
if (typeof token1 !== "undefined" && token1 !== "undefined") {
  console.log("After Parse Value", token1);
  headers = {
    Authorization: token1,
  };
}

export const getInsertQuestion = (questionInsert) => {
  return Axios.post("http://localhost:3000/api/v1/question", questionInsert, {
    headers: headers,
  })
    .then((response) => {
      console.log("Data inserted", response.data);
    })
    .catch((error) => {
      console.log(error);
    });
};
export const getEditQuestion = (questionEdit) => {
  console.log("Data Comming Edit Q Action", questionEdit);
  return Axios.put(
    `http://localhost:3000/api/v1/question/${questionEdit.id}`,
    questionEdit,
    {
      headers: headers,
    }
  )
    .then((response) => {
      console.log("Data Edited", response.data);
    })
    .catch((error) => {
      console.log(error);
    });
};
export const getQuestionBySubId = (subcategory_id) => {
  console.log("Question Coming From Id", subcategory_id);
  return Axios.post(
    `http://localhost:3000/api/v1/question/subcate/${subcategory_id}`,    
  )
    .then((response) => response.data)
    .catch((error) => console.log(error));
};
export const getQuestionById = (id) => {
  console.log("Question Coming From Id", id);
  return Axios.get(`http://localhost:3000/api/v1/question/${id}`)
    .then((response) => response.data)
    .catch((error) => console.log(error));
};

export const getQuestion = () => {
  return Axios.get("http://localhost:3000/api/v1/question")
    .then((response) => response.data)
    .catch((error) => console.log(error));
};
export const getPerPageQuestion = (id) => {
  return Axios.post("http://localhost:3000/api/v1/question/questionperpage",id)
    .then((response) => response.data)
    .catch((error) => console.log(error));
};

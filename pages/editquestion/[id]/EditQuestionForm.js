import React, { Component } from "react";
import Options from "../../../components/FeildComponents/Option";
import Answer from "../../../components/FeildComponents/Answer";
import QuestionField from "../../../components/FeildComponents/Question";
import Subcategory from "../../../components/FeildComponents/Subcategory";
import Category from "../../../components/FeildComponents/Category";
import { getCategories } from "../../../actions/category";
import { getsubcategoriesById } from "../../../actions/subcategory";
import { getEditQuestion } from "../../../actions/questions";
import validator from "validator";

export default class EditQuestionForm extends Component {
  componentDidMount = async () => {
    const categories = await getCategories();
    const subcategories = await getsubcategoriesById(this.state.category_id);    

    this.setState({
      categoryidfi: categories || [],
      subcategoryidfi: subcategories      
    });
  };
  constructor(props) {
    super(props);   
    this.state = {
       id:props.question.id  ,
      question: props.question.question,
      optionA: props.question.optionA,
      optionB: props.question.optionB,
      optionC: props.question.optionC,
      optionD: props.question.optionD,
      answer: props.question.answer,
      categoryidfi: [],
      subcategoryidfi: [],
      category_id: props.question.category_id + "",
      subcategory_id: props.question.subcategory_id + "",
      ErrorMsg: "",
      SuccessMsg: "",
    };
  }

  handleCategory = async (e) => {
    const category_id = e.target.value;
    const data = await getsubcategoriesById(category_id);
    this.setState({ category_id: category_id, subcategoryidfi: data });
  };

  handleSubCategory = (e) => {
    this.setState({
      subcategory_id: e.target.value,
    });
  };

  handleChangeQuestion = (question) => {
    this.setState({
      question,
    });
  };

  handleChangeOptionA = (optionA) => {
    this.setState({
      optionA,
    });
  };

  handleChangeOptionB = (optionB) => {
    this.setState({
      optionB,
    });
  };

  handleChangeOptionC = (optionC) => {
    this.setState({
      optionC,
    });
  };

  handleChangeOptionD = (optionD) => {
    this.setState({
      optionD,
    });
  };

  handleChangeAnswer = (e) => {
    this.setState({
      answer: e.target.value,
    });
  };
  handleSubmit = async (e) => {
    e.preventDefault();
    const {
      question,
      optionA,
      optionB,
      optionC,
      optionD,
      answer,
      category_id,
      subcategory_id,
      id
    } = this.state;
    const questionInsert = {
        question,
        optionA,
        optionB,
        optionC,
        optionD,
        answer,
        subcategory_id,
        category_id,
        id      
      };
      if (!validator.isEmpty(question) &&
      !validator.isEmpty(optionA) &&
      !validator.isEmpty(optionB) &&
      !validator.isEmpty(optionC) &&
      !validator.isEmpty(optionD) &&
      !validator.isEmpty(answer) &&
      !validator.isEmpty(category_id) &&
      !validator.isEmpty(subcategory_id)) {
      
      const data = await getEditQuestion(questionInsert);
      this.setState({
        SuccessMsg: "Question Edited Successfully.",
        ErrorMsg: "",
        question: '',
        optionA: '',
        optionB: '',
        optionC: '',
        optionD: '',
        answer: '',            
        category_id: '',
        subcategory_id: '' 
      });
    } else {
      this.setState({
        ErrorMsg: "Please Fill all Fields.",
      });
    }
  };
  render() {
    return (
      <div>
        <form>
          <Category
            label="Category"
            name="category_id"
            handlename={this.handleCategory}
            data={this.state.categoryidfi}
            selectedValue={this.state.category_id}
          />
          <Subcategory
            label="Sub Category"
            name="subcategory_id"
            handlename={this.handleSubCategory}
            data={this.state.subcategoryidfi}
            selectedValue={this.state.subcategory_id}
          />
          <QuestionField
            label="Question"
            content={this.state.question}
            handlechange={this.handleChangeQuestion}
            value={this.state.question}
          />
          <Options
            label="Option A"
            content={this.state.optionA}
            handlechange={this.handleChangeOptionA}
          />
          <Options
            label="Option B"
            content={this.state.optionB}
            handlechange={this.handleChangeOptionB}
          />
          <Options
            label="Option C"
            content={this.state.optionC}
            handlechange={this.handleChangeOptionC}
          />
          <Options
            label="Option D"
            content={this.state.optionD}
            handlechange={this.handleChangeOptionD}
          />
          <Answer
            label="Option Answer"
            content="answer"
            value={this.state.answer}
            handlechange={this.handleChangeAnswer}
          />
          <button
            type="submit"
            className="btn btn-dark"
            onClick={this.handleSubmit}
          >
            Edit
          </button>
          {this.state.SuccessMsg && (
            <div className="alert alert-success mt-3" role="alert">
              {" "}
              {this.state.SuccessMsg}{" "}
            </div>
          )}
          {this.state.ErrorMsg && (
            <div className="alert alert-danger mt-3" role="alert">
              {" "}
              {this.state.ErrorMsg}{" "}
            </div>
          )}
        </form>
      </div>
    );
  }
}

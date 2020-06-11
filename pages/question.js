import jwt_decode from 'jwt-decode';
import React, { Component } from 'react';
import Layout from "../components/Layout/Layout";
import validator from 'validator';
import Category from '../components/FeildComponents/Category';
import { getCategories } from '../actions/category';
import { getsubcategories } from '../actions/subcategory';
import Subcategory from '../components/FeildComponents/Subcategory';
import QuestionField from '../components/FeildComponents/Question';
import Options from '../components/FeildComponents/Option';
import Answer from '../components/FeildComponents/Answer';
import { getInsertQuestion } from '../actions/questions';


class QuestionPage extends Component {
    constructor() {
        super();
        this.state = {
            question: '',
            optionA: '',
            optionB: '',
            optionC: '',
            optionD: '',
            answer: '',
            categoryidfi: [],
            subcategoryidfi: [],
            subfi: [],
            category_id: '',
            subcategory_id: '',
            ErrorMsg: '',
            SuccessMsg: ''
        }
    }

    componentDidMount = async () => {
        const categories = await getCategories()
        this.setState({ categoryidfi: categories || [] })

        const subcategories = await getsubcategories()
        this.setState({ subcategoryidfi: subcategories })
    }

    handleCategory = (e) => {
        const category = e.target.value;
        const data = this.state.subcategoryidfi.filter((cat) => cat.category_id == category)
        this.setState({ subfi: data })
    }

    handleSubCategory = (e) => {
        this.setState({
            subcategory_id: e.target.value
        })
    }

    handleChangeQuestion = (question) => {
        this.setState({
            question
        })
    }

    handleChangeOptionA = (optionA) => {
        this.setState({
            optionA
        })
    }

    handleChangeOptionB = (optionB) => {
        this.setState({
            optionB
        })
    }

    handleChangeOptionC = (optionC) => {
        this.setState({
            optionC
        })
    }

    handleChangeOptionD = (optionD) => {
        this.setState({
            optionD
        })
    }

    handleChangeAnswer = (e) => {
        this.setState({
            answer: e.target.value
        })
    }
    handleSubmit = async (e) => {
        e.preventDefault();
        const {
            question,
            optionA,
            optionB,
            optionC,
            optionD,
            answer,
            subcategory_id
        } = this.state
        if (!validator.isEmpty(question) &&
            !validator.isEmpty(optionA) &&
            !validator.isEmpty(optionB) &&
            !validator.isEmpty(optionC) &&
            !validator.isEmpty(optionD) &&
            !validator.isEmpty(answer) &&
            !validator.isEmpty(subcategory_id)) {
            const questionInsert = {
                question,
                optionA,
                optionB,
                optionC,
                optionD,
                answer,
                subcategory_id
            }
            console.log("Question Details", questionInsert)
            const data = await getInsertQuestion(questionInsert);
            this.setState({
                SuccessMsg: "Question Entered Successfully.",
                ErrorMsg: ''
            })
        }
        else {
            this.setState({
                ErrorMsg: "Please Fill all Fields."
            })
        }

    }


    render() {
        // const user=window.localStorage.getItem("login");
        // console.log("User Q",JSON.parse(user));
        let token1 = window.localStorage.getItem("login");;
        // console.log("Token Get", JSON.parse(token1))
        // console.log(typeof token1)
        token1 = JSON.parse(token1);
        // console.log(typeof token1)
        const token = token1.token;
        const k = token.split(" ");
        console.log("k", k)
        //  console.log("Token :", token)
        // global.axios.defaults.headers.common.Authorization = token ? `Bearer ${token}` : null;
        var decoded = jwt_decode(k[1]);
        console.log(decoded);
        return (
            <Layout>
                <div className="col-md-10 mx-auto">
                    <h4 className="float-right">welcome {decoded.name}</h4>
                    <h1 className="text-center">Question Page</h1>
                    {

                    }
                    <form>
                        <Category label="Category" name="category_id" handlename={this.handleCategory} data={this.state.categoryidfi} />
                        <Subcategory label="Sub Category" name="subcategory_id" handlename={this.handleSubCategory} data={this.state.subfi} />
                        <QuestionField label="Question" content={this.state.question} handlechange={this.handleChangeQuestion} />
                        <Options label="Option A" content={this.state.optionA} handlechange={this.handleChangeOptionA} />
                        <Options label="Option B" content={this.state.optionB} handlechange={this.handleChangeOptionB} />
                        <Options label="Option C" content={this.state.optionC} handlechange={this.handleChangeOptionC} />
                        <Options label="Option D" content={this.state.optionD} handlechange={this.handleChangeOptionD} />
                        <Answer label="Option Answer" content="answer" handlechange={this.handleChangeAnswer} />
                        <button type="submit" className="btn btn-dark" onClick={this.handleSubmit}>Submit</button>
                        {this.state.SuccessMsg && <div className="alert alert-success mt-3" role="alert"> {this.state.SuccessMsg} </div>}
                        {this.state.ErrorMsg && <div className="alert alert-danger mt-3" role="alert"> {this.state.ErrorMsg} </div>}
                    </form>
                </div>
            </Layout>
        );
    }
}

export default QuestionPage
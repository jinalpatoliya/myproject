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

import jsCookie from 'js-cookie'

class QuestionPage extends Component {    
    static async getInitialProps(req,res){
        const categories = await getCategories()    
        const subcategories = await getsubcategories()       
        return{
          categoryidfi: categories || [] ,
          subcategoryidfi:subcategories
        }
        
      }
    
    constructor(props) {
        super(props);
        // console.log("Props value",props)
        this.state = {
            question: '',
            optionA: '',
            optionB: '',
            optionC: '',
            optionD: '',
            answer: '',
            categoryidfi: [],
            subcategoryidfi:this.props.subcategoryidfi,
            subfi: [],
            category_id: '',
            subcategory_id: '',
            ErrorMsg: '',
            SuccessMsg: ''
        }
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
                subcategory_id,
                name: props.initialName || ''
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
        // let token1 = window.localStorage.getItem("login");
        // token1 = JSON.parse(token1);       
        // const token = token1.token;
        // const k = token.split(" ");
        // console.log("k", k)
        // var decoded = jwt_decode(k[1]);
        // console.log(decoded);
        let myname=jsCookie.get("screenname");  
        let decoded={}      
        if(myname){
            myname=JSON.parse(myname);
            const token =myname.token;
            const k = token.split(" ");
            // console.log("k", k)
            decoded = jwt_decode(k[1]);
            // console.log("Decoded Token",decoded);
        }
        
        return (
            <Layout>
                <div className="col-md-10 mx-auto">
                    <h4 className="float-right">welcome {decoded.name}</h4>                    
                    <h1 className="text-center">Question Page</h1>
                    {

                    }
                    <form>
                        <Category label="Category" name="category_id" handlename={this.handleCategory} data={this.props.categoryidfi} />
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
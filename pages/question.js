import React, { Component } from 'react';
import Layout from "../components/Layout/Layout";
import validator from 'validator';
import Category from '../components/FeildComponents/Category';
import { getCategories } from '../actions/category';
import { getsubcategoriesById } from '../actions/subcategory';
import Subcategory from '../components/FeildComponents/Subcategory';
import QuestionField from '../components/FeildComponents/Question';
import Options from '../components/FeildComponents/Option';
import Answer from '../components/FeildComponents/Answer';
import { getInsertQuestion, checkDuplicateQuestionStatus } from '../actions/questions';
import { Cookies } from 'react-cookie';
import { Auth } from '../components/auth/auth';
import ErrorSuccess from '../components/ErrorSuccess/ErrorSuccess';

// const cookies = new Cookies();
class QuestionPage extends Component {    
    static async getInitialProps({req,res}){
        const categories = await getCategories()    
        // const subcategories = await getsubcategories() 
        // const subcategories = await getsubcategoriesById(this.state.category_id);
        const myval= Auth({req,res});
        console.log("Myval Value",myval)             
        return{
          categoryidfi: categories || [] ,
        //   subcategoryidfi:subcategories,
          decoded:myval.decoded          
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
            subcategoryidfi: [],            
            category_id: '',
            subcategory_id: '',
            ErrorMsg: '',
            SuccessMsg: ''
        }
    }

    handleCategory = async(e) => {
        const category = e.target.value;
        const data = await getsubcategoriesById(category);
        this.setState({ category_id: category, subcategoryidfi: data });
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
    checkDuplicateQuestion = async() => {
        const {question} = this.state;
        const data = await checkDuplicateQuestionStatus(question);
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
            subcategory_id,
            category_id
        } = this.state
        const questionInsert = {
            question,
            optionA,
            optionB,
            optionC,
            optionD,
            answer,
            category_id,
            subcategory_id
            // name: props.initialName || ''
        }
        console.log("Question Details", questionInsert)
        if (!validator.isEmpty(question) &&
            !validator.isEmpty(optionA) &&
            !validator.isEmpty(optionB) &&
            !validator.isEmpty(optionC) &&
            !validator.isEmpty(optionD) &&
            !validator.isEmpty(answer) &&
            !validator.isEmpty(category_id) &&
            !validator.isEmpty(subcategory_id)) {
            
            const data = await getInsertQuestion(questionInsert);
            this.setState({
                SuccessMsg: "Question Entered Successfully.",
                ErrorMsg: '',
                question: '',
                optionA: '',
                optionB: '',
                optionC: '',
                optionD: '',
                answer: '',            
                category_id: '',
                subcategory_id: ''                
            })
        }
        else {
            this.setState({
                ErrorMsg: "Please Fill all Fields."
            })
        }

    }    

    render() {               
        return (
            <Layout>
                <div className="col-md-10 mx-auto">
                    <h4 className="float-right">welcome {this.props.decoded.name && this.props.decoded.name }</h4>                    
                    <h1 className="text-center">Question Page</h1>                 
                    <form>
                        <Category label="Category" name="category_id" handlename={this.handleCategory} data={this.props.categoryidfi} value={this.state.category_id}/>
                        <Subcategory label="Sub Category" name="subcategory_id" handlename={this.handleSubCategory} data={this.state.subcategoryidfi} />
                        <QuestionField label="Question" content={this.state.question} handlechange={this.handleChangeQuestion} value={this.state.question}/>
                        {/* <button className="btn btn-primary mb-2" onclick={this.checkDuplicateQuestion} >Duplicate</button> */}
                        <Options label="Option A" content={this.state.optionA} handlechange={this.handleChangeOptionA} />
                        <Options label="Option B" content={this.state.optionB} handlechange={this.handleChangeOptionB} />
                        <Options label="Option C" content={this.state.optionC} handlechange={this.handleChangeOptionC} />
                        <Options label="Option D" content={this.state.optionD} handlechange={this.handleChangeOptionD} />
                        <Answer label="Option Answer" content="answer" handlechange={this.handleChangeAnswer} />
                        <button type="submit" className="btn btn-dark" onClick={this.handleSubmit}>Submit</button>                        
                        {/* {this.state.SuccessMsg && <div className="alert alert-success mt-3" role="alert"> {this.state.SuccessMsg} </div>}
                        {this.state.ErrorMsg && <div className="alert alert-danger mt-3" role="alert"> {this.state.ErrorMsg} </div>} */}
                        <ErrorSuccess Error={this.state.ErrorMsg} Success={this.state.SuccessMsg}/>
                    </form>
                </div>
            </Layout>
        );
    }
}

export default QuestionPage

 // let token, header,decoded1,decoded='';
        // token = cookies.get('token');
        // if(req) {
        //     console.log("Getinitial Props Call Server Side");
        //     header = req.headers
        //     console.log("----------------------------")
        //     header=header["cookie"]            
        //     decoded = jwt_decode(header);
        //     console.log("Decoded Token",decoded);            
        // }  
        // if(token){
        //     console.log("Getinitial Props Call Client Side");   
        //     console.log("My Tokennn",token);
        //     const k = token.token.split(" ");
        //     console.log("k", k)
        //     decoded1 = jwt_decode(k[1]);            
        // }  
        // else{
        //     window.location.replace('/login') 
        // }
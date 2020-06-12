import React, { Component } from 'react'
import Layout from '../components/Layout/Layout'
import validator from 'validator'
import { insertCategory } from '../actions/category';

export default class Category extends Component {
    constructor(){
        super();
        this.state={
            category:'',
            SuccessMsg:'',
            ErrorMsg:''
        }        
    }

    handleChange = (e) => {
        this.setState({
            [e.target.name]:e.target.value
        })
    }

    handleSubmit = async (e) => {
        e.preventDefault();
        const { category } = this.state      
        const categoryName ={
            categoryName:category
        }
        console.log("Catgeory",categoryName);
        if(!validator.isEmpty(category)){
            const data =await insertCategory(categoryName)
            console.log("Category Response",data)
            this.setState({
                SuccessMsg:data.Message,
                ErrorMsg:''
            })
        }
        else{
            this.setState({
                ErrorMsg:"Please Enter Category."
            })
        }
    }
    render() {
        return (
            <Layout>
                <div className="col-md-8 mx-auto">
                    <h1 className="text-center">Add Category</h1>
                    <form>
                        <div className="form-group">
                            <label>Category</label>
                            <input type="text" className="form-control" name="category" placeholder="Enter Category" onChange={this.handleChange} />
                        </div>                       
                        <button type="submit" className="btn btn-dark" onClick={this.handleSubmit}>Submit</button>
                        {
                            this.state.SuccessMsg ? <div className="alert alert-success mt-3" role="alert">
                                {this.state.SuccessMsg}
                            </div> : null
                        }
                        {
                            this.state.ErrorMsg ? <div className="alert alert-danger mt-3" role="alert">
                                {this.state.ErrorMsg}
                            </div> : null
                        }
                    </form>
                </div>
            </Layout>
        )
    }
}

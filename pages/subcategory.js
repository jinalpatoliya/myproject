import React, { Component } from 'react'
import Layout from '../components/Layout/Layout'
import validator from 'validator'
import { insertSubcategory } from '../actions/subcategory';
import Category from '../components/FeildComponents/Category'
import { getCategories } from '../actions/category';

export default class Subcategory extends Component {
    static async getInitialProps(){
        const categories = await getCategories()
        return{
             categoryidfi: categories || [] 
        }        
    }
    constructor(){
        super();
        this.state={
            subcategory:'',
            SuccessMsg:'',
            ErrorMsg:'',
            category_id:'',
            categoryidfi:''            
        }        
    }

    handleChange = (e) => {
        this.setState({
            [e.target.name]:e.target.value
        })
    }

    handleCategory = (e) => {
        const category = e.target.value;    
        console.log("category Details ",category)
        this.setState({
            category_id:category
        })
    }

    handleSubmit = async (e) => {
        e.preventDefault();
        const { subcategory,category_id } = this.state      
        const subcategoryName ={
            subcategoryName:subcategory,
            category_id:category_id
        }
        console.log("Sub Catgeory",subcategoryName);
        if(!validator.isEmpty(subcategory)){
            const data =await insertSubcategory(subcategoryName)
            console.log("Sub Category Response",data)
            this.setState({
                SuccessMsg:data.Message,
                ErrorMsg:''                
            })
        }
        else{
            this.setState({
                ErrorMsg:"Please Enter Sub Category."
            })
        }
    }
    render() {
        return (
            <Layout>
                <div className="col-md-8 mx-auto">
                    <h1 className="text-center">Add Category</h1>
                    <form>
                    
                    <Category label="Category" name="category_id"  data={this.props.categoryidfi} handlename={this.handleCategory} />
                        <div className="form-group">
                            <label>Sub Category</label>
                            <input type="text" className="form-control" name="subcategory" placeholder="Enter Sub Category" onChange={this.handleChange} />
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

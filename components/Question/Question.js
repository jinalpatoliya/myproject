import React, { Component, useState, Fragment } from 'react';
import { Editor } from "@tinymce/tinymce-react";
import Axios from 'axios'
import validator from 'validator';
import TinyMCE from '../TinyMCE/TinyMCE';
import { getCategories } from '../../actions/category';
import { getsubcategories } from '../../actions/subcategory';
import Category from '../FeildComponents/Category';

class Question extends Component {
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
 
  render() {
    return (
      <>   
        

        {/* <div className="form-group">
          <label>Sub Category :</label>
          <select name="subcategory_id" onChange={this.handleSubCategory} className="form-control">
            <option>Please Select Sub Category</option>
            {
              this.state.subfi.map((category) => {
                return (
                  <option key={category.id} value={category.id}>{category.subcategoryName} </option>
                )
              })
            }
          </select>
        </div> */}

        {/* <div className="form-group">
          <label>Question :</label>
          <TinyMCE content={this.state.question} handleChange={this.handleChangeQuestion} />
        </div> */}

        {/* <div className="form-group">
          <label>Option A :</label>
          <TinyMCE content={this.state.optionA} handleChange={this.handleChangeOptionA} />
        </div> */}

        {/* <div className="form-group">
          <label>Option B :</label>
          <TinyMCE content={this.state.optionB} handleChange={this.handleChangeOptionB} />
        </div>

        <div className="form-group">
          <label>Option C :</label>
          <TinyMCE content={this.state.optionC} handleChange={this.handleChangeOptionC} />
        </div>

        <div className="form-group">
          <label>Option D :</label>
          <TinyMCE content={this.state.optionD} handleChange={this.handleChangeOptionD} />
        </div> */}
       
       
      </>
    );
  }
}

export default Question;
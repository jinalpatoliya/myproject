import React, { Component } from "react";
import ErrorSuccess from "../../../components/ErrorSuccess/ErrorSuccess";
import { editCategory } from "../../../actions/category";
import validator from "validator";
import { Router } from "next/router";
import TinyMCE from "../../../components/TinyMCE/TinyMCE";

export default class EditCategoryFrom extends Component {
    constructor(props){
        super(props)
        this.state = {
            id:props.category.id,
            category:props.category.categoryName,
            categorySlug:props.category.categorySlug,
            categoryTitle:props.category.categoryTitle,
            categoryDescription:props.category.categoryDescription,
            categoryKeywords:props.category.categoryKeyword,
            categoryContent:props.category.categoryContent,
            Success: "",
            Error: "",
          };
        }
      
        handleChange = (e) => {
          let slug = e.target.value.toLowerCase();
          slug = slug.replace(" ", "-");
          this.setState({
            [e.target.name]: e.target.value,
            categorySlug: slug,
          });
        };
        handleSlug = (e) => {
          this.setState({
            categorySlug: e.target.value,
          });
        };
         
        handleChangeContent = (content) => {
          this.setState({
            categoryContent:content
          })
      }

      handleChangeKeyword = (e) => {
        this.setState({
            categoryKeywords: e.target.value,
          })
    }
        handleSubmit = async (e) => {
          e.preventDefault();
          const {
              id,
            category,
            categorySlug,
            categoryTitle,
            categoryDescription,
            categoryKeywords,
            categoryContent,
          } = this.state;
          const category1 = {
              id:id,
            categoryName: category,
            categorySlug: categorySlug,
            categoryTitle: categoryTitle,
            categoryDescription: categoryDescription,
            categoryKeyword: categoryKeywords,
            categoryContent: categoryContent,
          };
          if (
            !validator.isEmpty(category) &&
            !validator.isEmpty(categoryTitle) &&
            !validator.isEmpty(categoryDescription) &&
            !validator.isEmpty(categoryKeywords) &&
            !validator.isEmpty(categoryContent) &&
            !validator.isEmpty(categorySlug)
          ) {
            try {
              const data = await editCategory(category1);
              console.log("Category Data", data);     
              if (data) {
                this.setState({
                  Success: data.Message,
                })
              }         
              Router.push('/showcategory')              
            } 
            catch (error) {
              this.setState({
                Error:  error.Message,
                Success: "",
              });
              return;
            }
          } else {
            this.setState({
              Error: "Please Enter Category.",
            });
          }          
        };
  render() {
    return (         
          <form>
            <div className="form-group">
              <label>Category</label>
              <input
                type="text"
                className="form-control"
                name="category"
                placeholder="Enter Category"
                onChange={this.handleChange}
                value={this.state.category}
              />
            </div>
            <div className="form-group">
              <label>Category Slug</label>
              <input
                type="text"
                className="form-control"
                name="categorySlug"
                placeholder="Enter Category Slug"
                onChange={this.handleSlug}
                value={this.state.categorySlug}
              />
            </div>

            <div className="form-group">
              <label>Category Title</label>
              <input
                type="text"
                className="form-control"
                name="categoryTitle"
                placeholder="Enter Category Title"
                onChange={this.handleChange}
                value={this.state.categoryTitle}
              />
            </div>

            <div className="form-group">
              <label>Category Description</label>
              <input
                type="text"
                className="form-control"
                name="categoryDescription"
                placeholder="Enter Category Description"
                onChange={this.handleChange}
                value={this.state.categoryDescription}
              />
            </div>

            <div className="form-group">
              <label>Category Keywords</label>
              <input
                type="text"
                className="form-control"
                name="categoryKeywords"
                placeholder="Enter Category Keywords"
                onChange={this.handleChangeKeyword}
                value={this.state.categoryKeywords}
              />
            </div>

            <div className="form-group">
              <label>Category Content</label>
              <TinyMCE
                label="categoryContent"
                content={this.state.categoryContent}
                handleChange={this.handleChangeContent}
              />
            </div>
            <ErrorSuccess
              Error={this.state.Error}
              Success={this.state.Success}
            />
            <button
              type="submit"
              className="btn btn-dark"
              onClick={this.handleSubmit}
            >
              Submit
            </button>
          </form>
    );
  }
}

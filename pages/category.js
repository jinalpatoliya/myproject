import React, { Component } from "react";
import Layout from "../components/Layout/Layout";
import validator from "validator";
import { insertCategory, getCategories } from "../actions/category";
import ErrorSuccess from "../components/ErrorSuccess/ErrorSuccess";
import TinyMCE from "../components/TinyMCE/TinyMCE";
import Router from "next/router";
import { checkAuthentication } from "../util/auth";

export default class Category extends Component {
  static async getInitialProps({req,res}) {
    const categories = await getCategories();
    const myval = checkAuthentication({ req, res });
    return {
      categories: categories,
    };
  }
  constructor() {
    super();
    this.state = {
      category: "",
      categorySlug: "",
      categoryTitle: "",
      categoryDescription: "",
      categoryKeyword: "",
      categoryContent: "",
      Success: "",
      Error: "",
    };
  }

  handleChange = (e) => {   
    this.setState({
      [e.target.name]: e.target.value      
    });
  };
  handleChangeTitle = (e) => {
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
      categoryContent: content,
    });
  };
  handleChangeKeyword = (e) => {
    this.setState({
      categoryKeyword: e.target.value,
    });
  };
  handleSubmit = async (e) => {
    e.preventDefault();
    const {
      category,
      categorySlug,
      categoryTitle,
      categoryDescription,
      categoryKeyword,
      categoryContent,
    } = this.state;
    const category1 = {
      categoryName: category,
      categorySlug: categorySlug,
      categoryTitle: categoryTitle,
      categoryDescription: categoryDescription,
      categoryKeyword: categoryKeyword,
      categoryContent: categoryContent,
    };
    if (
      !validator.isEmpty(category) &&
      !validator.isEmpty(categoryTitle) &&
      !validator.isEmpty(categoryDescription) &&
      !validator.isEmpty(categoryKeyword) &&
      !validator.isEmpty(categoryContent) &&
      !validator.isEmpty(categorySlug)
    ) {
      try {
        const data = await insertCategory(category1);
        console.log("Category Data", data);
        if (data) {
          this.setState({
            Success: data.Message,
            Error: "",
            category: "",
            categorySlug: "",
            categoryTitle: "",
            categoryDescription: "",
            categoryKeyword: "",
            categoryContent: "",
          });
        }
      } catch (error) {
        this.setState({
          Error: error.data.Message,
          Success: "",
        });
        return;
      }
    } else {
      this.setState({
        Error: "Please Enter Category.",
      });
    }
    // }
  };
  clickme = () => {
    Router.push("/showcategory");
  };
  render() {
    return (
      <Layout>
        <div className="col-md-8 mx-auto">
          <h1>Add Category</h1>
          <button onClick={this.clickme} className="btn btn-primary pull-right">
            Show All Category
          </button>
          <form>
            <div className="form-group">
              <label>Category</label>
              <input
                type="text"
                className="form-control"
                name="category"
                placeholder="Enter Category"
                onChange={this.handleChangeTitle}
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
                name="categoryKeyword"
                placeholder="Enter Category Keywords"
                onChange={this.handleChangeKeyword}
                value={this.state.categoryKeyword}
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
        </div>
      </Layout>
    );
  }
}

import React, { Component } from "react";
import Layout from "../components/Layout/Layout";
import validator from "validator";
import { insertCategory, getCategories } from "../actions/category";
import ErrorSuccess from "../components/ErrorSuccess/ErrorSuccess";
import TinyMCE from "../components/TinyMCE/TinyMCE";

export default class Category extends Component {
  static async getInitialProps() {
    const categories = await getCategories();
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
      catgeoryDescription: "",
      categoryKeywords: "",
      categryContent: "",
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
      categryContent:content
    })
}
  handleSubmit = async (e) => {
    e.preventDefault();
    const {
      category,
      categorySlug,
      categoryTitle,
      catgeoryDescription,
      categoryKeywords,
      categryContent,
    } = this.state;
    const category1 = {
      categoryName: category,
      categorySlug: categorySlug,
      categoryTitle: categoryTitle,
      catgeoryDescription: catgeoryDescription,
      categoryKeywords: categoryKeywords,
      categryContent: categryContent,
    };
    if (
      !validator.isEmpty(category) &&
      !validator.isEmpty(categoryTitle) &&
      !validator.isEmpty(catgeoryDescription) &&
      !validator.isEmpty(categoryKeywords) &&
      !validator.isEmpty(categryContent) &&
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
            catgeoryDescription: "",
            categoryKeywords: "",
            categryContent: "",
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
  render() {
    return (
      <Layout>
        <div className="col-md-8 mx-auto">
          <h1 className="text-center">Add Category</h1>
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
                name="catgeoryDescription"
                placeholder="Enter Category Description"
                onChange={this.handleChange}
                value={this.state.catgeoryDescription}
              />
            </div>

            <div className="form-group">
              <label>Category Keywords</label>
              <input
                type="text"
                className="form-control"
                name="categoryKeywords"
                placeholder="Enter Category Keywords"
                onChange={this.handleChange}
                value={this.state.categoryKeywords}
              />
            </div>

            <div className="form-group">
              <label>Category Content</label>
              <TinyMCE label="categryContent" content={this.state.categryContent} handleChange={this.handleChangeContent} />
            </div>
            <button
              type="submit"
              className="btn btn-dark"
              onClick={this.handleSubmit}
            >
              Submit
            </button>
            <ErrorSuccess
              Error={this.state.Error}
              Success={this.state.Success}
            />
          </form>
        </div>
      </Layout>
    );
  }
}

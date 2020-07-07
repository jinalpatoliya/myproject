import React, { Component } from "react";
import Layout from "../components/Layout/Layout";
import validator from "validator";
import { insertCategory, getCategories } from "../actions/category";
import ErrorSuccess from "../components/ErrorSuccess/ErrorSuccess";

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
  handleSubmit = async (e) => {
    e.preventDefault();
    const { category, categorySlug } = this.state;
    const category1 = {
      categoryName: category,
      categorySlug: categorySlug,
    };
    // const categories=this.props.categories;
    // const data=categories.filter((cat)=>cat.categoryName==category);
    // if(data.length>0){
    //     this.setState({
    //         Error:"Already Exist Category."
    //     })
    // }
    // else{
    if (!validator.isEmpty(category) && !validator.isEmpty(categorySlug)) {
      try {
        const data = await insertCategory(category1);
        console.log("Category Data",data)
        if (data) {
          this.setState({
            Success: data.Message,
            Error: "",
            category: "",
            categorySlug: "",
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

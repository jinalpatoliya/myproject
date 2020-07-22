import React, { Component } from "react";
import Layout from "../components/Layout/Layout";
import validator from "validator";
import {
  insertSubcategory,
  getsubcategoriesById,
} from "../actions/subcategory";
import Category from "../components/FeildComponents/Category";
import { getCategories } from "../actions/category";
import ErrorSuccess from "../components/ErrorSuccess/ErrorSuccess";
import TinyMCE from "../components/TinyMCE/TinyMCE";
import Router from "next/router";
import { checkAuthentication } from "../util/auth";

export default class Subcategory extends Component {
  static async getInitialProps({req,res}) {
    const categories = await getCategories();
    const myval = checkAuthentication({ req, res });
    return {
      categoryidfi: categories || [],
    };
  }
  constructor() {
    super();
    this.state = {
      subcategory: "",
      Success: "",
      Error: "",
      category_id: "",
      categoryidfi: "",
      subcategorySlug: "",
      subcategories: [],
      subcategoryTitle: "",
      subcategoryDescription: "",
      subcategoryKeyword: "",
      subcategoryContent: "",
    };
  }

  handleChangecat = (e) => {
    let slug = e.target.value.toLowerCase();
    slug = slug.replace(/ /g, "-");
    this.setState({
      [e.target.name]: e.target.value,
      subcategorySlug: slug,
    });
  };
  handleSubcategory = (e) => {
    this.setState({
      subcategorySlug: e.target.value,
    });
  };
  handleChange = (e) => {
    this.setState({
      [e.target.name]:e.target.value
    })
  }
  handleCategory = async (e) => {
    const category = e.target.value;
    const subcategories = await getsubcategoriesById(e.target.value);
    this.setState({
      category_id: category,
      subcategories: subcategories,
    });
  };
  handleChangeContent = (content) => {
    this.setState({
      subcategoryContent: content,
    });
  };
  handleSubmit = async (e) => {
    e.preventDefault();
    const {
      subcategory,
      category_id,
      subcategorySlug,
      subcategoryTitle,
      subcategoryDescription,
      subcategoryKeyword,
      subcategoryContent,
    } = this.state;
    const subcategoryName = {
      subcategoryName: subcategory,
      category_id: category_id,
      subcategorySlug: subcategorySlug,
      subcategoryTitle: subcategoryTitle,
      subcategoryDescription: subcategoryDescription,
      subcategoryKeyword: subcategoryKeyword,
      subcategoryContent: subcategoryContent,
    };
    console.log("subcategoryName",subcategoryName)
    if (
      !validator.isEmpty(subcategory) &&
      !validator.isEmpty(subcategorySlug) &&
      !validator.isEmpty(subcategoryTitle) &&
      !validator.isEmpty(subcategoryDescription) &&
      !validator.isEmpty(subcategoryKeyword) &&
      !validator.isEmpty(subcategoryContent)
    ) {
      try {
        const data = await insertSubcategory(subcategoryName);
        if (data) {
          this.setState({
            Success: data.Message,
            Error: "",
            subcategory: "",
            subcategorySlug: "",
            category_id: "",
            subcategoryTitle: "",
            subcategoryDescription: "",
            subcategoryKeyword: "",
            subcategoryContent: "",
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
        Error: "Please Enter Sub Category.",
      });
    }
  };
  clickme = () => {
    Router.push("/showsubcategory");
  };
  render() {
    return (
      <Layout>
        <div className="col-md-8 mx-auto">
          <h1 className="text-center">Add Sub Category</h1>
          <button onClick={this.clickme} className="btn btn-primary pull-right">
            Show All Subcategory
          </button>
          <form>
            <Category
              label="Category"
              name="category_id"
              data={this.props.categoryidfi}
              handlename={this.handleCategory}
            />
            <div className="form-group">
              <label>Sub Category</label>
              <input
                type="text"
                className="form-control"
                name="subcategory"
                placeholder="Enter Sub Category"
                onChange={this.handleChangecat}
                value={this.state.subcategory}
              />
            </div>
            <div className="form-group">
              <label>Sub Category Slug</label>
              <input
                type="text"
                className="form-control"
                name="subcategorySlug"
                placeholder="Enter Sub Category Slug"
                onChange={this.handleSubcategory}
                value={this.state.subcategorySlug}
              />
            </div>
            <div className="form-group">
              <label>Subcategory Title</label>
              <input
                type="text"
                className="form-control"
                name="subcategoryTitle"
                placeholder="Enter Category Title"
                onChange={this.handleChange}
                value={this.state.subcategoryTitle}
              />
            </div>

            <div className="form-group">
              <label>Subcategory Description</label>
              <input
                type="text"
                className="form-control"
                name="subcategoryDescription"
                placeholder="Enter Category Description"
                onChange={this.handleChange}
                value={this.state.subcategoryDescription}
              />
            </div>

            <div className="form-group">
              <label>Subcategory Keywords</label>
              <input
                type="text"
                className="form-control"
                name="subcategoryKeyword"
                placeholder="Enter Category Keywords"
                onChange={this.handleChange}
                value={this.state.subcategoryKeyword}
              />
            </div>
            <div className="form-group">
              <label>Subategory Content</label>
              <TinyMCE
                label="subcategoryContent"
                content={this.state.subcategoryContent}
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

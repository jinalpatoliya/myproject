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

export default class Subcategory extends Component {
  static async getInitialProps() {
    const categories = await getCategories();
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
    };
  }

  handleChange = (e) => {
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

  handleCategory = async (e) => {
    const category = e.target.value;
    const subcategories = await getsubcategoriesById(e.target.value);
    this.setState({
      category_id: category,
      subcategories: subcategories,
    });
  };

  handleSubmit = async (e) => {
    e.preventDefault();
    const { subcategory, category_id, subcategorySlug } = this.state;
    const subcategoryName = {
      subcategoryName: subcategory,
      category_id: category_id,
      subcategorySlug: subcategorySlug,
    };
    if (
      !validator.isEmpty(subcategory) &&
      !validator.isEmpty(subcategorySlug)
    ) {
      try {
        const data = await insertSubcategory(subcategoryName);
        if (data) {
          this.setState({
            Success: data.Message,
            Error: "",
            subcategory: "",
            subcategorySlug: "",
            category_id:''
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
  render() {
    return (
      <Layout>
        <div className="col-md-8 mx-auto">
          <h1 className="text-center">Add Sub Category</h1>
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
                onChange={this.handleChange}
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

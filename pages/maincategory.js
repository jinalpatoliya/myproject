import React, { Component } from "react";
import Layout from "../components/Layout/Layout";
import validator from "validator";
import ErrorSuccess from "../components/ErrorSuccess/ErrorSuccess";
import { insertMainCategory } from "../actions/maincategory";

export default class Category extends Component {
  constructor() {
    super();
    this.state = {
      mainCategoryName: "",
      mainCategorySlug: "",
      mainCategoryTitle: "",
      Success: "",
      Error: "",
    };
  }

  handleChange = (e) => {
    let slug = e.target.value.toLowerCase();
    slug = slug.replace(" ", "-");
    this.setState({
      [e.target.name]: e.target.value,
      mainCategorySlug: slug,
    });
  };
  handleSlug = (e) => {
    this.setState({
      mainCategorySlug: e.target.value,
    });
  };
  handleChangeTitle = (e) => {
    this.setState({
      mainCategoryTitle: e.target.value,
    });
  };
  handleSubmit = async (e) => {
    e.preventDefault();
    const {
      mainCategoryName,
      mainCategorySlug,
      mainCategoryTitle,
    } = this.state;
    const maincategory = {
        mainCategoryName: mainCategoryName,
        mainCategorySlug: mainCategorySlug,
        mainCategoryTitle: mainCategoryTitle,
    };
    if (
      !validator.isEmpty(mainCategoryName) &&
      !validator.isEmpty(mainCategorySlug) &&
      !validator.isEmpty(mainCategoryTitle)
    ) {
      try {
        const data = await insertMainCategory(maincategory);
        console.log("Category Response", data);
        if (data) {
          this.setState({
            Success: data.Message,
            Error: "",
            mainCategorySlug: "",
            mainCategoryName: "",
            mainCategoryTitle: "",
          });
        }
      } catch (error) {
        this.setState({
          Error: error.data.Message,
          Success: "",
        });
        return;
      }
    } 
    else {
      this.setState({
        Error: "Please Enter Main Category.",
      });
    }
  };
  render() {
    return (
      <Layout>
        <div className="col-md-8 mx-auto">
          <h1 className="text-center">Add Main Category</h1>
          <form>
            <div className="form-group">
              <label>Main Category</label>
              <input
                type="text"
                className="form-control"
                name="mainCategoryName"
                placeholder="Enter Category"
                onChange={this.handleChange}
                value={this.state.mainCategoryName}
              />
            </div>
            <div className="form-group">
              <label> Main Category Slug</label>
              <input
                type="text"
                className="form-control"
                name="mainCategorySlug"
                placeholder="Enter Category Slug"
                onChange={this.handleSlug}
                value={this.state.mainCategorySlug}
              />
            </div>
            <div className="form-group">
              <label>Main Category Title</label>
              <input
                type="text"
                className="form-control"
                name="mainCategoryTitle"
                placeholder="Enter Main Category Tile"
                onChange={this.handleChangeTitle}
                value={this.state.mainCategoryTitle}
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

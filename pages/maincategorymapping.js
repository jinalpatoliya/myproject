import React, { Component, Fragment } from "react";
import Layout from "../components/Layout/Layout";
import { getMainCategories } from "../actions/maincategory";
import { getCategories } from "../actions/category";

export default class MaincategoryMapping extends Component {
  static async getInitialProps() {
    const maincategories = await getMainCategories();
    const categories = await getCategories();
    return {
      maincategories,
      categories,
    };
  }
  render() {
    const { maincategories, categories } = this.props;
    return (
      <Layout>
        <div className="col-md-10 mx-auto">
          <h1 className="text-center">Main Category Mapping</h1>
          <form>
            <div className="form-group">
              <label>Main Category</label>
              <select className="form-control" name="mainCategory">
                <option>Please Select Main Category</option>
                {maincategories.map((maincategory) => {
                  return (
                    <option key={maincategory.id} value={maincategory.id}>
                      {maincategory.mainCategoryName}
                    </option>
                  );
                })}
              </select>
            </div>
            <div className="partition d-flex ">
              <div className="p-2">
                <h3>Category</h3>
                <div class="panel panel-default">
                  <div class="panel-body">
                    {categories.map((category) => {
                      return (
                        <Fragment key={category.id}>
                          <input
                            type="checkbox"
                            name={category.categoryName}
                            value={category.id}
                          />
                          <label className="ml-2">
                            {" "}
                            {category.categoryName}
                          </label>
                          <br />
                        </Fragment>
                      );
                    })}
                    {/* <input type="checkbox" name="vehicle1" value="Bike"/>
                    <label for="vehicle1"> I have a bike</label><br></br> */}
                  </div>
                </div>
              </div>
              <div className="p-2">
                <h3>Category</h3>
                <div class="panel panel-default">
                  <div class="panel-body"></div>
                </div>
              </div>
            </div>
            <div className="form-group">
                <input type="submit" className="btn btn-dark" value="Submit" />
            </div>
          </form>
        </div>
      </Layout>
    );
  }
}

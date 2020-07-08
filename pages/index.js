import React, { Component } from "react";
import Layout from "../components/Layout/Layout";
import ShowCategory from "../components/ShowCategory/ShowCategory";
import { getMainCategories } from "../actions/maincategory";

export default class Index extends Component {
  static async getInitialProps({ req }) {
    const maincategory = await getMainCategories();
    return {
      maincategories: maincategory || [],
    };
  }
  render() {
    console.log("this.props.maincategories", this.props.maincategories);
    return (
      <Layout>
        <ul className="listclassupper">
          {this.props.maincategories.map((maincategory) => {
            return (
              <div className="listWrapper">
                <li className="categorylist" key={maincategory.id}>
                  {maincategory.mainCategoryName}
                </li>
                {/* <ShowCategory maincategoryid={maincategory.id} maincategoryname={maincategory.mainCategorySlug}/> */}
              </div>
            );
          })}
        </ul>
      </Layout>
    );
  }
}

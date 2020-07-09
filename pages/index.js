import React, { Component } from "react";
import Layout from "../components/Layout/Layout";
import ShowCategory from "../components/ShowCategory/ShowCategory";
import getConfig from "next/config";
import { getcategoriesByMainCategoryId } from "../actions/maincategorymapping";

export default class Index extends Component {
  static async getInitialProps({ req }) {  
    const data = await getcategoriesByMainCategoryId();     
    return {
      maincategories: data || [],
    };
  }
  render() {
    // console.log("this.props.maincategories", this.props.maincategories);
    return (
      <Layout>
        <ul className="listclassupper">
          {this.props.maincategories.map((data,index) => {
            // console.log("data.categoryList",data.categoryList)
            return (
              <div className="listWrapper">
                <li className="categorylist" key={index}>
                  {data.mainCategoryName}
                  
                </li>
                <ShowCategory catgeoryList={data.categoryList} mainCategoryName={data.mainCategoryName}/>
              </div>
            );
          })}
        </ul>
      </Layout>
    );
  }

  componentDidMount() {
    console.log(getConfig());
    console.log(process.env);
  }
}

import React, { Component } from "react";
import Layout from "../components/Layout/Layout";
import { getCategories } from "../actions/category";
import Link from "next/link";

export default class showcategory extends Component {
  static async getInitialProps() {
    const categories = await getCategories();
    return {
      categories,
    };
  }
  render() {
    const { categories } = this.props;
    return (
      <Layout>
        <div className="col-md-8 mx-auto">
          <h1 className="text-center">All Categories</h1>
          <table className="table table-bordered">
            <thead>
              <tr>
                <th>Category Name</th>
                <th>Edit</th>
              </tr>
            </thead>
            <tbody>
              {categories.map((category) => {
                return (
                  <tr key={category.id}>
                    <td>{category.categoryName}</td>
                    <td>
                      <Link href="/editCategory/[id]" as={`/editCategory/${category.id}`}>
                        <a>Edit</a>
                      </Link>
                    </td>
                  </tr>
                );
              })}
            </tbody>
          </table>
        </div>
      </Layout>
    );
  }
}

import React, { Component } from "react";
import Layout from "../components/Layout/Layout";
import Link from "next/link";
import { getSubcatgeories } from "../actions/subcategory";

export default class ShowSubcategory extends Component {
  static async getInitialProps() {
    const subcategories = await getSubcatgeories();
    return {
      subcategories,
    };
  }
  render() {
    const { subcategories } = this.props;
    return (
      <Layout>
        <div className="col-md-8 mx-auto">
          <h1 className="text-center">All Subcategories</h1>
          <table className="table table-bordered">
            <thead>
              <tr>
                <th>Sub Category Name</th>
                <th>Edit</th>
              </tr>
            </thead>
            <tbody>
              {subcategories.map((subcategory) => {
                return (
                  <tr key={subcategory.id}>
                    <td>{subcategory.subcategoryName}</td>
                    <td>
                      <Link href="/editSubcategory/[id]" as={`/editSubcategory/${subcategory.id}`}>
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

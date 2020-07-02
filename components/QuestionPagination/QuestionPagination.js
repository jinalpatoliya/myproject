import React, { Component, Fragment } from "react";
import Link from "next/link";
import next from "next";

export default class QuestionPagination extends Component {
  render() {
    const { activePage, category, subcategory, totalPage } = this.props;

    const ele = [];
    for (let i = 0; i < totalPage; i++) {
      const content = (
        <li key={i}>
          <Link
            href={`/[category]/[subcategory]?page=${i + 1}`}
            as={`/${category}/${subcategory}?page=${i + 1}`}
          >
            <a className={activePage == i ? "active" : ""}>{i + 1}</a>
          </Link>
        </li>
      );
      ele.push(content);
    }

    return (
      <Fragment>
        {activePage != 0 && (
          <li>
            <Link
              href={`/[category]/[subcategory]?page=${activePage}`}
              as={`/${category}/${subcategory}?page=${activePage}`}
            >
              <a>Previous</a>
            </Link>
          </li>
        )}
        {ele}
        {activePage + 1 != totalPage && (
          <li>
            <Link
              href={`/[category]/[subcategory]?page=${activePage + 2}`}
              as={`/${category}/${subcategory}?page=${activePage + 2}`}
            >
              <a>Next</a>
            </Link>
          </li>
        )}
      </Fragment>
    );
  }
}
